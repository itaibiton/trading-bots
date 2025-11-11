import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type User } from '@supabase/supabase-js'

/**
 * Requires a normal authenticated session (not a recovery session).
 * Use this to protect API routes and server actions.
 *
 * @throws Error if user is not authenticated or is in a recovery session
 * @returns Object containing the authenticated user and supabase client
 *
 * @example
 * // In an API route
 * export async function GET(request: Request) {
 *   try {
 *     const { user, supabase } = await requireNormalAuth()
 *     // ... handle request for authenticated user
 *   } catch (error) {
 *     return new Response('Unauthorized', { status: 401 })
 *   }
 * }
 */
export async function requireNormalAuth(): Promise<{
  user: User
  supabase: ReturnType<typeof createServerClient>
}> {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if this is a recovery session
  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (session) {
    const accessToken = session.access_token
    if (accessToken) {
      try {
        // Decode JWT payload to read AMR claim
        const parts = accessToken.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1], 'base64url').toString()
          )

          // Check if authenticated via recovery method
          if (Array.isArray(payload.amr) && payload.amr.length > 0) {
            if (payload.amr[0].method === 'recovery') {
              throw new Error(
                'Cannot access this endpoint during password recovery. Please complete the password reset first.'
              )
            }
          }
        }
      } catch (error) {
        // If it's our thrown error, re-throw it
        if (error instanceof Error && error.message.includes('password recovery')) {
          throw error
        }
        // Otherwise, log the error but allow access (fail open for decode errors)
        console.error('Error checking session type:', error)
      }
    }
  }

  return { user, supabase }
}

/**
 * Checks if the current session is a recovery session.
 * Use this for conditional logic that needs to know session type.
 *
 * @returns true if user is authenticated via recovery method, false otherwise
 *
 * @example
 * const isRecovery = await isRecoverySession()
 * if (isRecovery) {
 *   // Show limited UI
 * }
 */
export async function isRecoverySession(): Promise<boolean> {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  try {
    const { data } = await supabase.auth.getSession()
    const session = data.session

    if (session) {
      const accessToken = session.access_token
      if (accessToken) {
        const parts = accessToken.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1], 'base64url').toString()
          )

          if (Array.isArray(payload.amr) && payload.amr.length > 0) {
            return payload.amr[0].method === 'recovery'
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking recovery session:', error)
  }

  return false
}
