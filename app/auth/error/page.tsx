import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Authentication Error | TradingBot',
  description: 'An error occurred during authentication',
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const message = searchParams.message || 'An authentication error occurred. Please try again.'

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            Unable to complete authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{message}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/forgot-password">Request New Password Reset Link</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
