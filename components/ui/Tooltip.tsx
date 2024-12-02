"use client"

import { useState } from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
}

export function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-64 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-2 left-full ml-2">
          {text}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1 top-3" />
        </div>
      )}
    </div>
  )
} 