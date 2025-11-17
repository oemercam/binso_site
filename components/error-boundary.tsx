"use client"

import React from "react"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error boundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Etwas ist schiefgelaufen</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bitte laden Sie die Seite neu oder kontaktieren Sie uns, wenn das Problem weiterhin besteht.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#7A7FEE] text-white rounded-full hover:bg-[#6b70d4] transition"
            >
              Seite neu laden
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
