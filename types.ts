export type JobCardType = {
  id: string;
  title: string;
  company_name: string;
  company_logo: string;

  job_type: string;
  location: string;
  is_remote: boolean;

  posted_text: string; // "8 hours ago"
  posted_days_ago: number;

  salary?: string;

  publisher: string; // Recruit.net
};

export type DetailedJobType = JobCardType & {
  description: string;
  apply_options: {
    publisher: string;
    apply_link: string;
    is_direct: boolean;
  }[];
  city?: string;
  state?: string;
  country?: string;
  job_zone?: string;
};
