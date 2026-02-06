"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { JobCardType } from "./types";

interface JobsContextType {
  allJobs: JobCardType[];
  filteredJobs: JobCardType[];
  setAllJobs: React.Dispatch<React.SetStateAction<JobCardType[]>>;
  setFilteredJobs: React.Dispatch<React.SetStateAction<JobCardType[]>>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function useJobsContext(): JobsContextType {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext must be used within JobsProvider");
  }
  return context;
}

export function JobsProvider({ children }: { children: ReactNode }) {
  const [allJobs, setAllJobs] = useState<JobCardType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobCardType[]>([]);

  const value = { allJobs, filteredJobs, setAllJobs, setFilteredJobs };
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}
