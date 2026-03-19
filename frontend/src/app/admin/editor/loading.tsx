import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function EditorLoading() {
  return (
    <div className="p-8">
      <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}
