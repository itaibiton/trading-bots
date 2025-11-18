'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
}: CounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = spanRef.current
    if (!node) return

    if (prefersReducedMotion) {
      node.textContent = `${prefix}${Math.round(to).toLocaleString()}${suffix}`
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        node,
        { innerText: from },
        {
          innerText: to,
          duration,
          ease: 'power1.inOut',
          snap: { innerText: 1 },
          onUpdate() {
            if (!node) return
            const currentValue = Number(node.innerText)
            node.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`
          },
        }
      )
    }, node)

    return () => {
      context.revert()
    }
  }, [from, to, duration, prefix, suffix, prefersReducedMotion])

  return (
    <span ref={spanRef} className={cn('tabular-nums', className)}>
      {`${prefix}${from.toLocaleString()}${suffix}`}
    </span>
  )
}

