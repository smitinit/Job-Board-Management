import { JobCardType } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function JobCard({ job }: { job: JobCardType }) {
  return (
    <Card className="flex h-full flex-col transition hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-semibold overflow-hidden">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company_name}
              className="object-contain"
              width={40}
              height={40}
            />
          ) : (
            <span>{job.company_name?.[0] ?? "J"}</span>
          )}
        </div>

        <div className="min-w-0">
          <CardTitle className="truncate text-base leading-tight">
            {job.title}
          </CardTitle>
          <p className="truncate text-sm text-muted-foreground">
            {job.company_name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{job.location}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.job_type}</Badge>

          {job.is_remote && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Remote
            </Badge>
          )}

          {job.salary && (
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              {job.salary}
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground">Source: {job.publisher}</p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{job.posted_text}</span>
        </div>

        <Button asChild size="sm">
          <Link href={`/job/${job.id}`}>View Job</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
