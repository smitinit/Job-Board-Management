export type JobCardType = {
  id: string;
  title: string;
  company_name: string;
  company_logo: string;

  job_type: string;
  location: string;
  is_remote: boolean;

  posted_text: string;
  posted_days_ago: number;

  salary?: string;

  publisher: string;
};

export type DetailedJobType = JobCardType & {
  description: string;
  city?: string;
  state?: string;
  country?: string;
};
