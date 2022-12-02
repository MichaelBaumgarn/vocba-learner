import { type NextPage } from "next";

import { trpc } from "../utils/trpc";
import { PageHeader } from "react-creme";
import { AddVocab } from "../components/AddVocab";
import { VocabCard } from "../components/VocabCard";

export const VocabPage: NextPage = () => {
  const { data: vocab, refetch } = trpc.vocab.getAll.useQuery();
  const deleteWord = trpc.vocab.delete.useMutation();

  const handleDelete = (id: string) => {
    deleteWord.mutate({ id: id });
    refetch();
  };
  return (
    <div className="m-4">
      <AddVocab refetch={refetch} />
      <PageHeader size="lg" title="Vocabulary words" />
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-7 ">
        {vocab &&
          vocab.map((v, i) => (
            <VocabCard key={i} onDelete={handleDelete} vocab={v}></VocabCard>
          ))}
      </div>
    </div>
  );
};

export default VocabPage;
