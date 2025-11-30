import Counter from "@/components/Counter";
import { useTheme } from "@/hooks/useTheme";
import { socket } from "@/services/socket";
import { useUser } from "@/store/userStore";
import { useEffect, useState } from "react";

const LiveUserCount = () => {
  const user = useUser((state) => state.user);
  const { theme } = useTheme();
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    function CounterSocketEventHandler() {
      if (user) {
        const handleUserCount = (count: number) => {
          setUserCount(count);
        };

        socket.on("userCount", handleUserCount);
        socket.emit("request_user_count");
        return () => {
          socket.off("userCount", handleUserCount);
        };
      } else {
        setUserCount(0);
      }
    }
    CounterSocketEventHandler();
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[80vh]">
      <h1 className="text-6xl font-semibold">PEOPLE ONLINE</h1>
      <Counter
        value={userCount}
        textColor={`${theme === "dark" ? "text-white" : "text-black"}`}
      />
    </div>
  );
};

export default LiveUserCount;
