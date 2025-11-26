import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface BannerProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
}

export default function Banner({
  title,
  description,
  action,
  buttonText,
  buttonLink,
  onButtonClick,
}: BannerProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white rounded-lg border shadow-sm mb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {action ? (
        action
      ) : buttonLink ? (
        <Link href={buttonLink}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
}
