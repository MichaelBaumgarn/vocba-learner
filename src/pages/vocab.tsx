import { type NextPage } from "next";

import { trpc } from "../utils/trpc";
import { PageHeader } from "react-creme";
import { AddVocab } from "../components/AddVocab";
import { VocabCard } from "../components/VocabCard";
import type { Vocab } from "@prisma/client";

import { prisma } from "../server/db/client";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const vocabs = await prisma?.vocab.findMany();
  return {
    props: {
      vocabs,
    },
  };
}

interface IVocabPageProps {
  vocabs: Vocab[];
}

export const VocabPage: NextPage<IVocabPageProps> = ({
  vocabs: serverVocabs,
}) => {
  const { data: updatedVocabs, refetch } = trpc.vocab.getAll.useQuery();
  const [vocabs, setVocabs] = useState(serverVocabs);
  const deleteWord = trpc.vocab.delete.useMutation();

  useEffect(() => {
    if (updatedVocabs) setVocabs(updatedVocabs);
  }, [updatedVocabs]);

  useEffect(() => {
    if (deleteWord.isSuccess) refetch();
  }, [deleteWord.isSuccess, refetch]);

  const handleDelete = async (id: string) => {
    await deleteWord.mutate({ id: id });
  };
  return (
    <div className="m-4">
      <AddVocab refetch={refetch} />
      <PageHeader size="lg" title="Vocabulary words" />
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5  lg:grid-cols-7 ">
        {vocabs &&
          vocabs.map((v, i) => (
            <VocabCard key={i} onDelete={handleDelete} vocab={v} />
          ))}
      </div>
    </div>
  );
};

export default VocabPage;
