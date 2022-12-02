import { Button, Card, Input } from "react-creme";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc";

interface IAddVocabProps {
  refetch: () => void;
}

export const AddVocab: React.FunctionComponent<IAddVocabProps> = ({
  refetch,
}) => {
  const vocabMutation = trpc.vocab.post.useMutation();
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");

  useEffect(() => {
    if (vocabMutation.isSuccess) refetch();
  }, [vocabMutation.isSuccess, refetch]);

  const handleAdd = async () => {
    await vocabMutation.mutate({ english, spanish });
  };

  return (
    <Card header="Add vocab word">
      <div className="flex w-full flex-col justify-start">
        <div>English</div>
        <Input
          onChange={(e) => setEnglish(e)}
          value={english}
          focusable
        ></Input>
        <div>Spanish</div>
        <Input
          onChange={(e) => setSpanish(e)}
          value={spanish}
          focusable
        ></Input>
        <div className="my-4">
          <Button accent="flat" size="lg" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
