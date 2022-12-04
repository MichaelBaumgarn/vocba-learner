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

  const findMistake = () => {
    let answer = "catfoodogman".split("");
    let userInput = "batflwadjdogmaan".split("");
    let result = [];
    // somehow find matches,
    // run over matches, find largest matching substrings,
    // simmilar to longest palindorome

    // if user letter in answer, move to cand
    // for cand, find range of match both direction left and right
    // find lengths?
    userInput.forEach((userLetter) => {
      // damn find the index instead
      let match = answer.find((a, i) => a == userLetter);
      if (match) return result.push(match);
    });
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      const candidate = result[i];
    }

    // for (let i = 0; i < userInput.length; i++) {
    //   const userLetter = userInput[i];
    //   let correct = false;
    //   if (userInput[i] == answer[i]) {
    //     correct = true;
    //     answer.shift()
    //     userInput.shift()
    //   } else {
    //   }
    //   result.push({
    //     letter: userInput[i],
    //     correct,
    //   });
    // }
  };
  findMistake();

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
          <p className="">{vocabs[currentIndex]?.spanish}</p>
          <p>{correct ? "CORRECT!" : "WRONG!"}</p>
        </>
      )}
    </div>
  );
};

export default Learn;
