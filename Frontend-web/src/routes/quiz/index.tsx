import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Room</h1>
      <div className="flex flex-row gap-4 mt-4">
        <Button
          variant={"outline"}
          onClick={() => {
            navigate({ to: "/quiz/room/join" });
          }}
        >
          Join
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            navigate({ to: "/quiz/room/create" });
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
