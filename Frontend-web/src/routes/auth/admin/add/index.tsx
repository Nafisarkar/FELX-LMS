import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { createFileRoute } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/admin/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answerindex, setAnswerIndex] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !answerindex
    ) {
      alert("Please fill all fields");
      return;
    }

    console.log({
      question,
      options: [option1, option2, option3, option4],
      answerindex,
    });
    try {
      const response = await api.post("/item/", {
        question,
        options: [option1, option2, option3, option4],
        answer: parseInt(answerindex, 10),
      });
      console.log("Item created:", response.data);
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswerIndex("");
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Button
        className="flex gap-4 items-center w-fit text-foreground"
        variant={"link"}
      >
        <SquarePen />
        <h1 className="text-md ">Add New Question</h1>
      </Button>
      <form className="flex flex-col gap-4 max-w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="flex flex-row gap-4">
          <Input
            placeholder="Option A"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          <Input
            placeholder="Option B"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
          <Input
            placeholder="Option C"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
          <Input
            placeholder="Option D"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </div>
        <Input
          placeholder="Answer Index"
          value={answerindex}
          onChange={(e) => setAnswerIndex(e.target.value)}
        />
      </form>
      <Button
        type="submit"
        className="w-fit "
        variant={"outline"}
        onClick={handleSubmit}
        disabled={loading}
      >
        Add
      </Button>
    </div>
  );
}
