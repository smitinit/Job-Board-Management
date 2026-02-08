import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="sticky top-0 z-50 grid grid-cols-2 gap-2 bg-background px-4 py-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md sm:w-[160px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="space-y-3">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-10 z-50 flex w-full justify-end px-4">
        <div className="flex items-center gap-2 rounded-full bg-accent p-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </>
  );
}
