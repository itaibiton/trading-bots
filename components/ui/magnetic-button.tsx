'use client'

import { MouseEvent, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MagneticButtonProps extends React.ComponentProps<typeof Button> {
  intensity?: number
  containerClassName?: string
}

export function MagneticButton({
  children,
  intensity = 0.25,
  containerClassName,
  className,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const node = wrapperRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * intensity
    const y = (event.clientY - rect.top - rect.height / 2) * intensity

    gsap.to(node, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return
    const node = wrapperRef.current
    if (!node) return

    gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' })
  }

  return (
    <div
      ref={wrapperRef}
      className={cn('inline-flex', containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </div>
  )
}

