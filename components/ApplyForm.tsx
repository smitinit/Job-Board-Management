"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const resume = formData.get("resume") as File | null;

    // Basic validation
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (resume) {
      if (resume.type !== "application/pdf") {
        setError("Resume must be a PDF file.");
        return;
      }
      if (resume.size > 5 * 1024 * 1024) {
        setError("Resume must be smaller than 5MB.");
        return;
      }
    }

    console.log({
      jobId,
      name,
      email,
      phone,
      resume,
    });
  }

  return (
    <Card className="mx-auto max-w-2xl w-full border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Apply for this job</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input id="name" name="name" placeholder="John Doe" required />
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
