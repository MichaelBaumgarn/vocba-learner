import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";

const Vocab: NextPage = () => {
  const getAllVocabs = trpc.vocab.getAll.useQuery();

  return (
    <div>
      {getAllVocabs.data &&
        getAllVocabs.data.map((v, i) => <div key={i}>{v.english}</div>)}
      <AddVocab foo={""} />
    </div>
  );
};

export default Vocab;

interface IAppProps {
  foo: string;
}

export const AddVocab: React.FunctionComponent<IAppProps> = (props) => {
  const insertVocab = trpc.vocab.post.useMutation();
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const handleAdd = async () => {
    console.log("add", english, spanish);
    insertVocab.mutate({ english, spanish });
  };
  return (
    <div>
      <div>add vocab word</div>
      <div>english</div>
      <input
        onChange={(e) => setEnglish(e.target.value)}
        className="outline"
      ></input>
      <div>spanish</div>
      <input
        onChange={(e) => setSpanish(e.target.value)}
        className="outline"
      ></input>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
