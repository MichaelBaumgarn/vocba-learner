import * as React from "react";

import { MistakeType } from "../pages/learn";

export interface IShowAnswerProps {
  answerCorrection: MistakeType[];
  correct: boolean;
  answerString: string | undefined;
}
export function ShowAnswer({
  answerCorrection,
  correct,
  answerString,
}: IShowAnswerProps) {
  return (
    <div>
      <p
        data-cy={correct ? "correct" : "false"}
        className={correct ? "text-green-500" : "text-red-700"}
      >
        {answerString}
      </p>
      {answerCorrection.length > 0 && !correct && (
        <p>
          {answerCorrection.map((substring, i) => (
            <span
              key={i}
              className={`${
                substring.correct ? "text-green-500" : "text-orange-500"
              }`}
            >
              {substring.text}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
export default ShowAnswer;
