'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LogOut, Settings, User, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const { user, signOut, loading } = useAuth()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  // Hide navbar on password reset page for focused UX
  if (pathname === '/reset-password') {
    return null
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">Cypher</span>
          </Link>
          {user && (
            <div className="hidden md:flex space-x-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
             {!user && (
                <>
                  <Link
                    href="#features"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                   <Link
                    href="#pricing"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </>
             )}
            <ThemeToggle />
          </div>

          {loading ? (
            <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">{getInitials(user.email || '')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                  <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu */}
          <div className="md:hidden ml-2">
             <Sheet>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                   </Button>
                </SheetTrigger>
                <SheetContent>
                   <div className="flex flex-col space-y-4 mt-8">
                      <Link href="/" className="text-lg font-semibold">Home</Link>
                      {!user && (
                        <>
                           <Link href="#features" className="text-lg text-muted-foreground">Features</Link>
                           <Link href="#pricing" className="text-lg text-muted-foreground">Pricing</Link>
                           <Link href="/login" className="text-lg text-muted-foreground">Sign In</Link>
                        </>
                      )}
                      {user && (
                         <Link href="/dashboard" className="text-lg text-primary">Dashboard</Link>
                      )}
                   </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
