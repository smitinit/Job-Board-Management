import { JobCardType, DetailedJobType } from "@/types";

type JobLike = {
  job_id?: string;
  job_title?: string;
  employer_name?: string;
  employer_logo?: string | null;

  job_employment_type?: string;

  job_location?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;

  job_is_remote?: boolean | null;

  job_posted_at?: string | null;
  job_posted_at_timestamp?: number | null;

  job_salary?: string | null;
  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_salary_period?: string | null;

  job_publisher?: string;

  job_description?: string;

  apply_options?: {
    publisher?: string;
    apply_link?: string;
    is_direct?: boolean;
  }[];

  job_onet_job_zone?: string;
};

function getPostedDaysAgo(timestamp?: number | null): number {
  if (!timestamp) return 0;

  return Math.max(
    0,
    Math.floor((Date.now() - timestamp * 1000) / (1000 * 60 * 60 * 24)),
  );
}

// if directly given then return or return the modified version
function getPostedText(job: JobLike, daysAgo: number): string {
  return (
    job.job_posted_at ??
    (job.job_posted_at_timestamp ? `${daysAgo} days ago` : "Recently")
  );
}

// if api return job salary directly return it directly or return on the basis of job min max period salary
function getSalary(job: JobLike): string | undefined {
  if (job.job_salary) return job.job_salary;

  if (job.job_min_salary && job.job_max_salary && job.job_salary_period) {
    return `${job.job_min_salary}-${job.job_max_salary} ${job.job_salary_period}`;
  }

  return undefined;
}

// front page listing function
export function mapJobsField(job: JobLike): JobCardType {
  const postedDaysAgo = getPostedDaysAgo(job.job_posted_at_timestamp);

  return {
    id: job.job_id ?? "",
    title: job.job_title ?? "",
    company_name: job.employer_name ?? "",
    company_logo: job.employer_logo || "",

    job_type: job.job_employment_type ?? "Unknown",
    location: job.job_location!,

    is_remote: Boolean(job.job_is_remote),

    posted_text: getPostedText(job, postedDaysAgo),
    posted_days_ago: postedDaysAgo,

    salary: getSalary(job),
    publisher: job.job_publisher ?? "Unknown",
  };
}

// detailed page listing function
export function mapJobByIdFields(job: JobLike): DetailedJobType {
  return {
    ...mapJobsField(job),

    description: job.job_description ?? "",
    city: job.job_city,
    state: job.job_state,
    country: job.job_country,
  };
}
