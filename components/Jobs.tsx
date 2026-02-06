"use client";

import JobCard from "./design/JobCard";

import { JobCardType } from "@/types";
import { useJobsContext } from "@/store";

import { useEffect } from "react";

export default function Jobs({ jobs }: { jobs: JobCardType[] }) {
  const { setAllJobs, filteredJobs, setFilteredJobs } = useJobsContext();

  useEffect(() => {
    setAllJobs(jobs);
    setFilteredJobs((prev) => (prev.length ? prev : jobs));
  }, [jobs, setAllJobs, setFilteredJobs]);

  if (!filteredJobs.length) {
    return <div className="flex justify-center">No jobs found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
