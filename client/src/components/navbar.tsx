import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between border-b items-center backdrop-blur-sm z-50 sticky top-0 p-5 border-gray-200">
      <div
        className="absolute inset-0 -z-1 pointer-events-none"
        style={{
          backgroundImage: `
       radial-gradient(circle at center, #c4b5fd, transparent)
     `,
        }}
      />
      <div>
        <Link href="/">PaceStacks</Link>
      </div>
      <div className="flex gap-5">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
