import ModeToggle from "./ThemeToggle";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-background mb-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-2">
        <Link href="/" className="text-lg font-bold shrink-0 ">
          Job Board Management
        </Link>

        <div className="self-end sm:self-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
