import AdminNavbar from "@/components/ui/custome/adminnavbar";
import Loading from "@/components/ui/custome/loading.tsx";
import { useUser } from "@/store/userStore.ts";
import { Outlet, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
}
