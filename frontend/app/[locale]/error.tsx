'use client'

import {useEffect} from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <p className="text-fluid-4xl font-display font-bold text-error">!</p>
        <h1 className="mt-2 text-fluid-xl font-display text-on-surface">Something went wrong</h1>
        <p className="mt-4 text-on-surface-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
