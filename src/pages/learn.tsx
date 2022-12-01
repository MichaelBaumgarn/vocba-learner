import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";

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
  return (
    <div className="flex flex-col items-center">
      <div>{mode}</div>
      <div>{currentIndex}</div>
      <div>{correct}</div>
      {vocab.data[currentIndex]?.english}
      <input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="outline"
      ></input>
      {mode === "question" ? (
        <button onClick={handleAnswer}>Submit</button>
      ) : (
        <>
          <button onClick={handleNextQuestion}>Next Question</button>
          {vocab.data[currentIndex]?.spanish}
          <p>{correct ? "CORRECT!" : "WRONG!"}</p>
        </>
      )}
    </div>
  );
};

export default Learn;
