import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if this is a recovery session (password reset in progress)
  let isRecoverySession = false
  if (user) {
    try {
      // Get session to check authentication method
      const { data } = await supabase.auth.getSession()
      const session = data.session

      if (session) {
        // Check AMR (Authentication Methods Reference) claim
        // Recovery sessions have amr[0].method === 'recovery'
        const accessToken = session.access_token
        if (accessToken) {
          // Decode JWT payload to read AMR claim
          const parts = accessToken.split('.')
          if (parts.length === 3) {
            const payload = JSON.parse(
              Buffer.from(parts[1], 'base64url').toString()
            )

            // Check if authenticated via recovery method
            if (Array.isArray(payload.amr) && payload.amr.length > 0) {
              isRecoverySession = payload.amr[0].method === 'recovery'
            }
          }
        }
      }
    } catch (error) {
      // If we can't determine session type, log error but continue
      console.error('Error checking recovery session:', error)
    }
  }

  // SECURITY: Restrict recovery sessions to only /reset-password
  // Prevents authentication bypass where users could access dashboard without completing password reset
  if (isRecoverySession) {
    // Only allow access to reset-password page and auth routes
    if (
      !request.nextUrl.pathname.startsWith('/reset-password') &&
      !request.nextUrl.pathname.startsWith('/auth/')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/reset-password'
      return NextResponse.redirect(url)
    }
  }

  // Protected routes check
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/api/protected'))
  ) {
    // Redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access auth pages, redirect to dashboard
  // BUT: Don't redirect if they're in a recovery session
  if (
    user &&
    !isRecoverySession &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
