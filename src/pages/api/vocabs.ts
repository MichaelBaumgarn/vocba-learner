import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const vocabs = async (req: NextApiRequest, res: NextApiResponse) => {
  const vocabs = await prisma.vocab.findMany();
  res.status(200).json(vocabs);
};

export default vocabs;
