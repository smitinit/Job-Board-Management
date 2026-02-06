import JobDetail from "@/components/JobDetails";
import { mapJSearchToDetailedJob } from "@/lib/job-mapper";
import { DetailedJobType } from "@/types";

async function getJobById(
  jobId: string,
): Promise<[DetailedJobType | null, Error | null]> {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}`;
  const data = { result: null, error: null };
  try {
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch job details");

    const apiData = await res.json();
    data.result = apiData.data?.[0] ?? [];

    return [mapJSearchToDetailedJob(data.result), null];
  } catch (error) {
    return [null, error as Error];
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  const [job, error] = await getJobById(jobId);

  if (error) {
    return <div>Failed to load job details</div>;
  }
  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="py-4">
      <JobDetail job={job} />
    </div>
  );
}
