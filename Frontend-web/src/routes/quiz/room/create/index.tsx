import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/quiz/room/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [roomid, setRoomid] = useState("");

  const createRoomID = () => {
    const uuid = crypto.randomUUID();
    setRoomid(uuid.split("-")[0]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Enter the name of your quiz room:</p>
      <div className="flex flex-row gap-4">
        <Input type="text" placeholder="Room Code" value={roomid}></Input>
        <Button
          variant={"outline"}
          onClick={() => {
            createRoomID();
          }}
        >
          <Shuffle />
        </Button>
        <Button variant={"outline"}>Create Room</Button>
      </div>
    </div>
  );
}
