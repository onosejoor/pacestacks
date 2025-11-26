import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function LoaderDisplay({
  text = "Loading...",
}: {
  text: string;
}) {
  return (
    <Card className="grid place-content-center bg-white min-h-screen p-4 rounded-md">
      <CardContent>
        <div className="flex flex-col items-center gap-2.5">
          <div className="p-2.5 rounded-full bg-blue-500 w-fit">
            <Loader2 className="size-7.5 animate-spin text-white" />
          </div>
          <p className="text-center text-muted-foreground font-medium">
            {text}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
