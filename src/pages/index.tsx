import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/vocab",
      permanent: false,
    },
  };

  return {
    props: {},
  };
}

const Home: NextPage = () => {
  return <></>;
};

export default Home;

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold"
      onClick={sessionData ? () => signOut() : () => signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};
