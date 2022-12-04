import { Button, Card } from "react-creme";

import type { Vocab } from "@prisma/client";

export interface IVocabCardProps {
  onDelete: (id: string) => void;
  vocab: Vocab;
}

export const VocabCard = ({ vocab, onDelete }: IVocabCardProps) => {
  return (
    <Card
      alignHeader="left"
      footer={
        <div data-cy={`delete-${vocab.english}`}>
          <Button
            size="md"
            type="danger"
            label="delete"
            onClick={() => onDelete(vocab.id)}
          />
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <div data-cy="english-question">{vocab.english}</div>
        <div data-cy="spanish-question">{vocab.spanish}</div>
      </div>
    </Card>
  );
};
