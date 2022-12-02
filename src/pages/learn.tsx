import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";
import { Button, Input } from "react-creme";

const Learn: NextPage = () => {
  const vocab = trpc.vocab.getAll.useQuery();
  const [mode, setMode] = useState<"question" | "answer">("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  if (!vocab.data) {
    return <div>please create some vocab words</div>;
  }

  const handleNextQuestion = () => {
    setMode("question");
    setUserAnswer("");

    setCorrect(false);
    if (currentIndex < vocab.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleAnswer = () => {
    setMode("answer");
    if (userAnswer === vocab.data[currentIndex]?.spanish) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code == "Enter") {
      if (mode === "answer") {
        handleNextQuestion();
      } else {
        handleAnswer();
      }
    }
  };
  return (
    <div
      className="m-6 flex flex-col items-center space-y-6 text-5xl"
      onKeyDown={handleEnter}
    >
      {/* <div>{mode}</div>
      <div>{currentIndex}</div>
      <div>{correct}</div> */}
      <p className="">{vocab.data[currentIndex]?.english}</p>
      <div className="w-xl">
        <Input
          size="lg"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e)}
        ></Input>
      </div>
      {mode === "question" ? (
        <Button label="Submit" size="lg" onClick={handleAnswer}></Button>
      ) : (
        <>
          <Button
            size="lg"
            onClick={handleNextQuestion}
            label="Next Question"
          ></Button>
          <p className="">{vocab.data[currentIndex]?.spanish}</p>
          <p>{correct ? "CORRECT!" : "WRONG!"}</p>
        </>
      )}
    </div>
  );
};

export default Learn;
