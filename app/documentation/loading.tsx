import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-1/3 mx-auto mt-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-6 shadow-md rounded-lg border bg-card">
            <div className="flex flex-row items-center space-x-4 pb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-3/5" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
