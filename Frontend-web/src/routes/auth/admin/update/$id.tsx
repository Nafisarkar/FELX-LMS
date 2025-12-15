import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/auth/admin/update/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answerindex, setAnswerIndex] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get quiz data by id
    const fetchQuizData = async () => {
      try {
        const response = await api.get(`/item/${id}`);
        console.log("Fetched quiz data:", response.data.findItem);
        const item = response.data.findItem;
        setQuestion(item.question);
        setOption1(item.options[0]);
        setOption2(item.options[1]);
        setOption3(item.options[2]);
        setOption4(item.options[3]);
        setAnswerIndex(item.answer.toString());
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

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
      const response = await api.patch(`/item/${id}`, {
        question,
        options: [option1, option2, option3, option4],
        answer: parseInt(answerindex, 10),
      });
      console.log("Item updated:", response.data);
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
        <ArrowBigRight />
        <h1 className="text-md "> Updating {id}</h1>
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
      <div className="flex gap-4">
        <Button
          type="submit"
          className="w-fit "
          variant={"default"}
          onClick={handleSubmit}
          disabled={loading}
        >
          Update
        </Button>
        <Button
          className="w-fit"
          variant={"destructive"}
          onClick={handleSubmit}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
