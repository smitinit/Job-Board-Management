"use client";

import { JobCardType } from "@/types";
import JobCard from "./design/JobCard";

import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Jobs({ jobs }: { jobs: JobCardType[] }) {
  const [filterFields, setFilterFields] = useState({
    title: "",
    category: "all",
  });

  const getAllCategory = [
    "All",
    ...new Set(jobs.flatMap((job) => job.job_type)),
  ];

  const filteredJobs = useMemo(() => {
    // get search value(title)
    const search = filterFields.title.toLowerCase();

    return jobs.filter((job) => {
      // job title and category
      const jobTitle = job.title.toLowerCase();
      const jobCategory = job.job_type.toLowerCase();

      // match search with job title and category
      const matchesSearch = jobTitle.includes(search);
      const matchesCategory =
        filterFields.category === "all" ||
        jobCategory === filterFields.category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [jobs, filterFields]);

  return (
    <>
      <div className="sticky top-0 z-50 grid grid-cols-2 px-4 py-2 gap-2 bg-background">
        <Input
          placeholder="Search jobs..."
          name="title"
          onChange={(e) =>
            setFilterFields({ ...filterFields, title: e.target.value })
          }
          className="flex-1"
        />

        <Select
          name="category"
          onValueChange={(value) =>
            setFilterFields({ ...filterFields, category: value })
          }
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {getAllCategory.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredJobs.length ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center col-span-1 md:col-span-2 lg:col-span-3">
            No jobs match your filters!
          </div>
        )}
      </div>
    </>
  );
}
