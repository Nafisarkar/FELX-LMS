import { ShieldUser } from "lucide-react";
import { Button } from "../button";
import { useNavigate } from "@tanstack/react-router";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center ">
      <Button
        className="flex gap-4 items-center text-foreground"
        variant={"link"}
        onClick={() => {
          navigate({ to: "/auth/admin" });
        }}
      >
        <ShieldUser size={25} />
        <h1 className="text-md ">Admin Panel</h1>
      </Button>
      <div className="flex flex-row gap-4 ">
        <Button
          variant="outline"
          onClick={() => {
            navigate({ to: "/auth/admin/add" });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
