"use server";

import { redirect } from "next/navigation";

import fs from "fs/promises";
import path from "path";
import { toast } from "sonner";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "data.json");
const RESUMES_DIR = path.join(DATA_DIR, "resumes");

type StoredApplication = {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string | null;
  resumeName: string;
  appliedAt: string;
};

export async function applyJobAction(formData: FormData) {
  const jobId = formData.get("jobId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string | null;
  const resume = formData.get("resume") as File;

  if (!jobId || !name || !email || !resume) {
    throw new Error("jobId, name, email and resume are required");
  }

  await fs.mkdir(RESUMES_DIR, { recursive: true });

  const id = crypto.randomUUID();

  // get the file extension
  const ext = resume.name.split(".").pop() || "pdf";

  const resumeFileName = `${id}-resume.${ext}`;
  const resumePath = path.join(RESUMES_DIR, resumeFileName);

  // File → Buffer
  const buffer = Buffer.from(await resume.arrayBuffer());
  await fs.writeFile(resumePath, buffer);

  const record: StoredApplication = {
    id,
    jobId,
    name,
    email,
    phone,
    resumeName: resumeFileName,
    appliedAt: new Date().toISOString(),
  };

  let data: StoredApplication[] = [];

  try {
    data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
  } catch {
    data = [];
  }

  data.push(record);

  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

  return { success: true };
}
