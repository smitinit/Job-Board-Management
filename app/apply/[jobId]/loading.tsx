"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center items-center ">
      <Card className="mx-auto max-w-4xl border-none bg-transparent shadow-none">
        <CardHeader className="pb-6">
          <Skeleton className="h-7 w-56" />
        </CardHeader>

        <CardContent className="p-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-12 w-28 rounded-full" />

              <div className="flex gap-3">
                <Skeleton className="h-12 w-28 rounded-full" />
                <Skeleton className="h-12 w-44 rounded-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
