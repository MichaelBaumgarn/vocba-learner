import { Button, Card, Input } from "react-creme";

import { trpc } from "../utils/trpc";
import { useState } from "react";

interface IAddVocabProps {
  refetch: () => void;
}

export const AddVocab: React.FunctionComponent<IAddVocabProps> = ({
  refetch,
}) => {
  const insertVocab = trpc.vocab.post.useMutation();
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const handleAdd = async () => {
    refetch();
    console.log("add", english, spanish);
    insertVocab.mutate({ english, spanish });
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
