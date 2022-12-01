import { publicProcedure, router } from "../trpc";

import { z } from "zod";

export const vocabRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vocab.findMany();
  }),
  post: publicProcedure
    .input(z.object({ english: z.string(), spanish: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vocab.create({ data: input });
    }),
});
