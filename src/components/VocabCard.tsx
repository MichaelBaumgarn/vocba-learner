import { Button, Card } from "react-creme";

import type { Vocab } from "@prisma/client";

export interface IVocabCardProps {
  onDelete: (id: string) => void;
  key: number;
  vocab: Vocab;
}

export const VocabCard = ({ key, vocab, onDelete }: IVocabCardProps) => {
  return (
    <Card
      key={key}
      alignHeader="left"
      footer={
        <Button
          size="md"
          type="danger"
          label="delete"
          onClick={() => onDelete(vocab.id)}
        />
      }
    >
      <div className="flex flex-col items-center">
        <div>{vocab.english}</div>
        <div>{vocab.spanish}</div>
      </div>
    </Card>
  );
};
