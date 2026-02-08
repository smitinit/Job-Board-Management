import { DetailedJobType } from "@/types";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MapPin, Clock, Globe } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function JobDetails({ job }: { job: DetailedJobType }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 ">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-start gap-4">
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
              <CardTitle className="text-xl leading-tight">
                {job.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {job.company_name}
              </p>
            </div>
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

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.posted_text}
              </span>
            </div>
          </div>

          <div className="flex items-center w-full gap-2 justify-end">
            <Button asChild>
              <Link href={`/apply/${job.id}`}>Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="flex justify-between gap-4 w-full">
        <Card className="w-1/3 h-fit sticky top-4">
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <Detail label="Employment Type" value={job.job_type} />
            <Detail label="Remote" value={job.is_remote ? "Yes" : "No"} />
            <Detail label="City" value={job.city} />
            <Detail label="State" value={job.state} />
            <Detail label="Country" value={job.country} />
            <Detail label="Source" value={job.publisher} />
            <Detail label="Job Zone" value={job.job_zone} />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{job.description}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
