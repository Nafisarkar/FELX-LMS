import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/room/join/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <p>Enter the code for quiz room to join:</p>
      <div className="flex flex-row gap-4">
        <Input type="text" placeholder="Room Code" />
        <Button variant={"outline"}>Join Room</Button>
      </div>
    </div>
  );
}
