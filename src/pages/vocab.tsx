import { type NextPage } from "next";

import { trpc } from "../utils/trpc";
import { PageHeader } from "react-creme";
import { AddVocab } from "../components/AddVocab";
import { VocabCard } from "../components/VocabCard";

export const VocabPage: NextPage = () => {
  const { data: vocab, refetch } = trpc.vocab.getAll.useQuery();
  const deleteWord = trpc.vocab.delete.useMutation();

  const handleDelete = (id: string) => {
    console.log(id);

    deleteWord.mutate({ id: id });
    refetch();
  };
  return (
    <div className="m-4">
      <AddVocab refetch={refetch} />
      <PageHeader size="lg" title="Vocabulary words" />
      <div className="my-4 flex justify-center">
        <div className="grid gap-4 md:grid-cols-5  lg:grid-cols-7 ">
          {vocab &&
            vocab.map((v, i) => (
              <VocabCard key={i} onDelete={handleDelete} vocab={v}></VocabCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VocabPage;
