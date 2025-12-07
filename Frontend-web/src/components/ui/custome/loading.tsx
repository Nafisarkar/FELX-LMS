import { Loader2Icon } from "lucide-react";

function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
      <Loader2Icon className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
}

export default Loading;
