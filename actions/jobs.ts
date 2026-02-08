"use server";

import { mapJSearchToJobCard } from "@/lib/job-mapper";

export async function getJobs() {
  const url =
    "https://jsearch.p.rapidapi.com/search?query=developer jobs in vadodara&page=1&num_pages=1&country=india&date_posted=all";
  const res = await fetch(url, {
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    next: { revalidate: 6000 },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.data.map(mapJSearchToJobCard);
}
