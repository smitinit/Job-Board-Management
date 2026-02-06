import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      {/* Header */}
      <CardHeader className="flex flex-row items-start gap-3">
        {/* Logo */}
        <Skeleton className="h-10 w-10 rounded-md" />

        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-3 text-sm">
        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Publisher */}
        <Skeleton className="h-3 w-32" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-8 w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
}
