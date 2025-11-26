import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function ErrorDisplay({
  title = "An Error Occured",
  message = "Internal Server Error",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Card className="grid place-content-center bg-white min-h-screen p-4 rounded-md">
      <CardContent>
        <div className="flex flex-col items-center gap-2.5">
          <div className="p-2.5 rounded-full bg-red-600 w-fit">
            <AlertCircle className="size-7.5 text-white" />
          </div>
          <p className="text-center text-muted-foreground font-medium">
            {title}
          </p>
          <p className="">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
