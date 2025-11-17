'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals Monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('[Performance] LCP:', lastEntry.renderTime || lastEntry.loadTime)
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log('[Performance] FID:', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ type: 'first-input', buffered: true })

        // Cumulative Layout Shift (CLS)
        let clsScore = 0
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value
              console.log('[Performance] CLS:', clsScore)
            }
          })
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })

        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch (e) {
        console.warn('[Performance] Observer not supported', e)
      }
    }
  }, [])

  return null
}
