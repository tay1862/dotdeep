import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <p className="text-fluid-4xl font-display font-bold text-brand-500">404</p>
        <h1 className="mt-2 text-fluid-xl font-display text-on-surface">Page not found</h1>
        <p className="mt-4 text-on-surface-muted">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
