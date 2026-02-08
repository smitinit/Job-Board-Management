import Link from "next/link";
import { getJobById } from "@/actions/jobs";

import JobDetail from "@/components/JobDetails";
import { Button } from "@/components/ui/button";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  const jobData = await getJobById(jobId);

  if (!jobData || !jobData.id) {
    return (
      <div className="text-center">
        Job not found! <br />
        <Button asChild variant="link">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <JobDetail job={jobData} />
    </div>
  );
}
