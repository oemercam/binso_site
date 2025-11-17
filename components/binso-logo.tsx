"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function BinsoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className} style={{ width: '140px' }} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <svg
      viewBox="0 0 150 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Icon: Hexagonal symbol */}
      <g transform="translate(8, 12)">
        {/* Outer hexagon */}
        <path d="M 13 2 L 23 8 L 23 18 L 13 24 L 3 18 L 3 8 Z" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="2.5" />
        
        {/* Inner geometric pattern */}
        <circle cx="13" cy="13" r="4" fill="url(#logoGradient)" opacity="0.7" />
        <path d="M 13 7 L 9 13 L 13 19 L 17 13 Z" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="2" 
              opacity="0.5" />
        
        {/* Small accent dots */}
        <circle cx="8" cy="10" r="1.5" fill="url(#logoGradient)" />
        <circle cx="18" cy="10" r="1.5" fill="url(#logoGradient)" />
        <circle cx="8" cy="16" r="1.5" fill="url(#logoGradient)" />
        <circle cx="18" cy="16" r="1.5" fill="url(#logoGradient)" />
      </g>
      
      <text
        x="45"
        y="32"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.5"
        fill={isDark ? "#F9FAFB" : "#111827"}
      >
        binso
      </text>
    </svg>
  )
}
