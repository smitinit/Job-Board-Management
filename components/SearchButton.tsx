"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SearchButton() {
  const status = useFormStatus();
  return (
    <Button type="submit">{status.pending ? "Searching..." : "Search"}</Button>
  );
}
