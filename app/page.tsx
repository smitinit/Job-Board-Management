import Jobs from "@/components/Jobs";
import { getJobs } from "@/actions/jobs";

export default async function Home() {
  const jobData = await getJobs();
  return <Jobs jobs={jobData} />;
}
