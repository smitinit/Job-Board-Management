"use server";

import { mapJobsField, mapJobByIdFields } from "@/lib/job-mapper";

export async function getJobs() {
  try {
    const url =
      "https://jsearch.p.rapidapi.com/search?query=all%20jobs%20in%20Vadodara&page=1&num_pages=2&country=india&date_posted=all";
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const apiData = await res.json();

    return apiData.data.map(mapJobsField);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getJobById(jobId: string) {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}`;
  try {
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch job details");

    const apiData = await res.json();
    return mapJobByIdFields(apiData.data[0]);
  } catch (error) {
    console.log(error);
    return null;
  }
}
