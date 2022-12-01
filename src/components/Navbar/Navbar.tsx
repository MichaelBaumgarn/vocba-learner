import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";

export default function WithSubnavigation() {
  const { data: session } = useSession();

  return (
    <div className="m-6 flex justify-center space-x-6">
      <Link href="/vocab">Vocab</Link>
      <Link href="/learn">Learn</Link>
    </div>
  );
}
