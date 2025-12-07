import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    
  </div>;
}
