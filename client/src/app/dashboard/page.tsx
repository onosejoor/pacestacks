import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-auth-text-primary">Welcome</h1>
        <p className="text-foreground text-lg">
          Choose an option to get started
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard/products">
            <Button className="bg-auth-button-primary text-white hover:bg-auth-button-primary-hover">
              Products
            </Button>
          </Link>
          <Link href="/dashboard/documents">
            <Button
              variant="outline"
              className="border-auth-input-border text-auth-text-primary hover:bg-auth-button-secondary-hover"
            >
              Documents
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
