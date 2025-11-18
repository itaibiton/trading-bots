'use client'

import { ElementType, PropsWithChildren, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface RevealProps extends PropsWithChildren {
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({
  as: Component = 'div',
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: once,
    threshold: 0.3,
  })

  const setRefs = (node: HTMLElement | null) => {
    elementRef.current = node
    inViewRef(node)
  }

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    if (prefersReducedMotion) {
      node.style.opacity = '1'
      node.style.transform = 'none'
      return
    }

    const context = gsap.context(() => {
      if (inView) {
        gsap.fromTo(
          node,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay,
          }
        )
      }
    }, node)

    return () => context.revert()
  }, [delay, inView, prefersReducedMotion, y])

  return (
    <Component
      ref={setRefs}
      className={cn('will-change-transform opacity-0', prefersReducedMotion && 'opacity-100', className)}
    >
      {children}
    </Component>
  )
}

