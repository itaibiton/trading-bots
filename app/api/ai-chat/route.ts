/**
 * AI Chat API Route
 *
 * Proxies requests to the Supabase Edge Function
 */

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log('[ai-chat] Auth check:', {
      hasUser: !!user,
      userId: user?.id,
      userError: userError?.message
    });

    if (userError || !user) {
      console.error('[ai-chat] User auth failed:', userError);
      return NextResponse.json({ error: 'Unauthorized - Not logged in' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();

    // Get the session to pass the access token to the Edge Function
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    console.log('[ai-chat] Session check:', {
      hasSession: !!session,
      hasAccessToken: !!session?.access_token,
      sessionError: sessionError?.message
    });

    if (!session) {
      console.error('[ai-chat] Session not found:', sessionError);
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    // Call Edge Function with explicit Authorization header
    console.log('[ai-chat] Calling Edge Function with action:', body.action);

    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    console.log('[ai-chat] Edge Function response:', {
      hasData: !!data,
      hasError: !!error,
      errorMessage: error?.message
    });

    if (error) {
      // Log full error details for debugging
      console.error('Edge Function error (full details):', {
        message: error.message,
        // @ts-ignore - context may exist on error object
        status: error.context?.status,
        // @ts-ignore
        statusText: error.context?.statusText,
        // @ts-ignore
        response: error.context?.response,
        // @ts-ignore
        body: error.context?.body,
        fullError: error,
      });

      // Determine status code (default to 500 if not available)
      // @ts-ignore
      const statusCode = error.context?.status || 500;

      return NextResponse.json(
        {
          error: error.message || 'Edge Function error',
          // Include details in development mode for easier debugging
          ...(process.env.NODE_ENV === 'development' && {
            details: {
              status: statusCode,
              // @ts-ignore
              statusText: error.context?.statusText,
            },
          }),
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
