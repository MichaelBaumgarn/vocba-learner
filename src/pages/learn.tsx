import { type NextPage } from "next";

import { useState } from "react";
import { Button, Input } from "react-creme";
import { Vocab } from "@prisma/client";
import { prisma } from "../server/db/client";

export async function getServerSideProps() {
  const vocabs = await prisma?.vocab.findMany();
  return {
    props: {
      vocabs,
    },
  };
}

const Learn: NextPage<{ vocabs: Vocab[] }> = ({ vocabs }) => {
  const [mode, setMode] = useState<"question" | "answer">("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  if (!vocabs) {
    return <div>please create some vocab words</div>;
  }

  const handleNextQuestion = () => {
    setMode("question");
    setUserAnswer("");

    setCorrect(false);
    if (currentIndex < vocabs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleAnswer = () => {
    setMode("answer");
    if (userAnswer === vocabs[currentIndex]?.spanish) {
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
      <p className="">{vocabs[currentIndex]?.english}</p>
      <div className="w-xl" data-cy="answer-input">
        <Input
          size="lg"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e)}
        ></Input>
      </div>
      {mode === "question" ? (
        <div data-cy="submit">
        <Button label="Submit" size="lg" onClick={handleAnswer}></Button>
        </div>
      ) : (
        <>
          <div data-cy="next-question">
          <Button
            size="lg"
            onClick={handleNextQuestion}
            label="Next Question"
          ></Button>
          </div>
          <p className="">{vocabs[currentIndex]?.spanish}</p>
          <p>{correct ? "CORRECT!" : "WRONG!"}</p>
        </>
      )}
    </div>
  );
};

export default Learn;
