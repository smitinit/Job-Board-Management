"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import { applyJobAction } from "@/actions/apply";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (e: FormData) => {
    try {
      await applyJobAction(e);
      toast("Applied to Job successfully!");
      router.replace(`/job/${jobId}`);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl w-full border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Apply for this job</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" action={(e) => handleAction(e)}>
          <input
            type="text"
            className="hidden"
            name="jobId"
            defaultValue={jobId}
          />
          <div className="space-y-1">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input id="name" name="name" placeholder="Smit Patel" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="smit@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 9876543210"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="resume">
              Resume (PDF, max 5MB) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-between pt-4">
            <Button type="button" variant="destructive" asChild>
              <Link href={`/job/${jobId}`}>Cancel</Link>
            </Button>

            <div className="flex gap-2">
              <Button type="reset" variant="outline">
                Reset
              </Button>

              <Button type="submit">Submit Application</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
