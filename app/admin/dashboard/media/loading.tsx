export default function MediaLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-9 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-40 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-gray-200 animate-pulse rounded" />
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-gray-200 animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
