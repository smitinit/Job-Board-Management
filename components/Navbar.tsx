"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ModeToggle from "./ThemeToggle";
import SearchButton from "./SearchButton";
import Link from "next/link";
import { useJobsContext } from "@/store";

export function Navbar() {
  const { allJobs, setFilteredJobs } = useJobsContext();

  const getAllCategory = [
    "All",
    ...new Set(allJobs.flatMap((job) => job.job_type)),
  ];

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const type = formData.get("type") as string;
    const category = formData.get("category") as string;

    if (!type.length && !category) {
      setFilteredJobs(allJobs);
      return;
    }

    const filterJobs = allJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(type.toLowerCase()) &&
        (category === "All" || job.job_type === category)
      );
    });

    setFilteredJobs(filterJobs);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background mb-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <Link href="/" className="text-lg font-bold shrink-0">
          Job Board
        </Link>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <form className="flex w-full gap-2" onSubmit={onSubmit}>
            <Input placeholder="Search jobs" name="type" className="flex-1" />

            <Select name="category">
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {getAllCategory.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <SearchButton />
          </form>
        </div>

        <div className="self-end sm:self-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
