import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Header skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-12 w-3/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Cover skeleton */}
      <div className="mb-8 aspect-video animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />

      {/* Content skeleton */}
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            style={{ width: `${85 + Math.random() * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}
