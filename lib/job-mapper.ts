import { JobCardType, DetailedJobType } from "@/types";

export function mapJSearchToJobCard(job: any): JobCardType {
  // Posted time (text + numeric)
  const postedText =
    job.job_posted_at ??
    (job.job_posted_at_timestamp
      ? `${Math.max(
          0,
          Math.floor(
            (Date.now() - job.job_posted_at_timestamp * 1000) /
              (1000 * 60 * 60 * 24),
          ),
        )} days ago`
      : "Recently");

  const postedDaysAgo = job.job_posted_at_timestamp
    ? Math.max(
        0,
        Math.floor(
          (Date.now() - job.job_posted_at_timestamp * 1000) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  // Salary (best-effort)
  let salary: string | undefined;

  if (job.job_salary) {
    salary = job.job_salary;
  } else if (
    job.job_min_salary &&
    job.job_max_salary &&
    job.job_salary_period
  ) {
    salary = `${job.job_min_salary}-${job.job_max_salary} ${job.job_salary_period}`;
  }

  return {
    id: job.job_id,
    title: job.job_title,
    company_name: job.employer_name,
    company_logo: job.employer_logo || "",

    job_type: job.job_employment_type ?? "Unknown",
    location:
      job.job_location ??
      [job.job_city, job.job_state, job.job_country].filter(Boolean).join(", "),

    is_remote: Boolean(job.job_is_remote),

    posted_text: postedText,
    posted_days_ago: postedDaysAgo,

    salary,
    publisher: job.job_publisher ?? "Unknown",
  };
}

export function mapJSearchToDetailedJob(job: any): DetailedJobType {
  return {
    ...mapJSearchToJobCard(job),

    description: job.job_description ?? "",

    apply_options: Array.isArray(job.apply_options)
      ? job.apply_options.map((opt: any) => ({
          publisher: opt.publisher,
          apply_link: opt.apply_link,
          is_direct: Boolean(opt.is_direct),
        }))
      : [],

    city: job.job_city ?? undefined,
    state: job.job_state ?? undefined,
    country: job.job_country ?? undefined,
    job_zone: job.job_onet_job_zone ?? undefined,
  };
}
