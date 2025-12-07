import { Button } from "@/components/ui/button.tsx";
import Loading from "@/components/ui/custome/loading.tsx";
import { useUser } from "@/store/userStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const isLoading = useUser((state) => state.isLoading);
  useEffect(() => {
    if (!user) {
      navigate({ to: "/auth/login" });
    }
  }, [user, navigate]);

  if (isLoading || !user) {
    return <Loading />;
  }
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
