import ApplyForm from "@/components/ApplyForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return (
    <div className="flex h-screen justify-center items-center ">
      <ApplyForm jobId={jobId} />
    </div>
  );
}
