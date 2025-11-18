'use client'

import { useEffect, useMemo } from 'react'
import type { AnimatedValue } from 'react-native'
import { Animated, Easing } from 'react-bits'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

type BackgroundVariant = 'mesh' | 'particles' | 'grid'

interface AnimatedBackgroundProps {
  variant?: BackgroundVariant
  className?: string
  opacity?: number
}

type BlobConfig = {
  color: string
  size: number
  xRange: [number, number]
  yRange: [number, number]
  blur: number
}

const VARIANT_CONFIG: Record<BackgroundVariant, BlobConfig[]> = {
  mesh: [
    { color: '59,130,246', size: 420, xRange: [-80, 60], yRange: [-40, 50], blur: 140 },
    { color: '16,185,129', size: 360, xRange: [-40, 80], yRange: [-20, 60], blur: 160 },
    { color: '245,158,11', size: 320, xRange: [-90, 70], yRange: [-60, 30], blur: 120 },
  ],
  particles: Array.from({ length: 16 }).map((_, index) => ({
    color: index % 2 === 0 ? '59,130,246' : '94,234,212',
    size: 6,
    xRange: [-100 + index * 12, -60 + index * 12],
    yRange: [-60 + index * 8, 80 - index * 6],
    blur: 0,
  })),
  grid: [
    { color: '59,130,246', size: 8, xRange: [-100, 100], yRange: [-100, 100], blur: 0 },
  ],
}

const AnimatedView = Animated.View

export function AnimatedBackground({
  variant = 'mesh',
  className,
  opacity = 0.9,
}: AnimatedBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const animatedValues = useMemo(
    () => VARIANT_CONFIG[variant].map(() => new Animated.Value(Math.random()) as AnimatedValue),
    [variant]
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const animations = animatedValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 7000 + index * 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 7000 + index * 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
        ])
      )
    )

    animations.forEach((animation) => animation.start())
    return () => animations.forEach((animation) => animation.stop())
  }, [animatedValues, prefersReducedMotion])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden blur-0',
        className
      )}
      style={{ opacity }}
    >
      {VARIANT_CONFIG[variant].map((blob, index) => {
        const animatedValue = animatedValues[index]
        const translateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: blob.xRange,
        })
        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: blob.yRange,
        })
        const scale = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.85, 1.15],
        })

        if (variant === 'grid') {
          return (
            <svg key={`grid-${index}`} className="absolute inset-0 h-full w-full" role="presentation">
              <defs>
                <pattern
                  id={`grid-pattern-${blob.color}`}
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke={`rgba(${blob.color}, 0.1)`}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-pattern-${blob.color})`} />
            </svg>
          )
        }

        return (
          <AnimatedView
            key={`blob-${index}`}
            style={{
              position: 'absolute',
              width: blob.size,
              height: blob.size,
              borderRadius: blob.size,
              backgroundColor: `rgba(${blob.color}, ${variant === 'particles' ? 0.6 : 0.25})`,
              filter: blob.blur ? `blur(${blob.blur}px)` : undefined,
              transform: [{ translateX }, { translateY }, { scale }],
              top: '50%',
              left: '50%',
            }}
          />
        )
      })}
    </div>
  )
}

