import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../button";
import { ProfileCard } from "./profilecard";
import Themetoggle from "./themetoggle.tsx";
import { useUser } from "@/store/userStore.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  return (
    <div className="w-full h-16 flex justify-between items-center px-4 border rounded-md">
      <Link to="/" className="text-2xl font-bold font-edu">
        Flex
      </Link>

      <div className="flex flex-row justify-center items-center gap-4">
        {user ? (
          <div className="flex flex-row gap-4">
            {user.role === "admin" && (
              <Button
                variant={"outline"}
                onClick={() => {
                  navigate({ to: "/auth/admin" });
                }}
              >
                Admin
              </Button>
            )}

            <Button
              variant={"outline"}
              onClick={() => {
                navigate({ href: "/quiz" });
              }}
            >
              Quiz
            </Button>
            <ProfileCard />
          </div>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => {
              navigate({ to: "/auth/login" });
            }}
          >
            Login
          </Button>
        )}

        <Themetoggle />
      </div>
    </div>
  );
};

export default Navbar;
