"use client";

import { JobCardType } from "@/types";
import JobCard from "./design/JobCard";

import { useEffect, useMemo, useState } from "react";
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
import { Button } from "./ui/button";

export default function Jobs({ jobs }: { jobs: JobCardType[] }) {
  const [filterFields, setFilterFields] = useState({
    title: "",
    category: "all",
  });

  const [page, setPage] = useState(1);

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

  // pagination
  const totalJobs = filteredJobs.length;
  const totalPerPage = 6;
  const totalPages = Math.ceil(totalJobs / totalPerPage);

  const paginatedJobs = filteredJobs.slice(
    (page - 1) * totalPerPage, // 1->0, 2->6
    page * totalPerPage, // 1->6, 2->12
  );

  useEffect(() => {
    // reset page to 1 when filter changes
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);
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
          <SelectTrigger className="w-full sm:w-40">
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
        {paginatedJobs.length ? (
          paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center col-span-1 md:col-span-2 lg:col-span-3">
            No jobs match your filters!
          </div>
        )}
      </div>
      {paginatedJobs.length > 0 && (
        <div className="fixed bottom-5 z-50 flex ">
          <div className="flex gap-2 w-fit rounded-full p-4 items-center">
            <Button
              onClick={() => setPage((page) => Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-base">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((page) => Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
