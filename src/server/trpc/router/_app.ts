import { authRouter } from "./auth";
import { router } from "../trpc";
import { vocabRouter } from "./vocab";

export const appRouter = router({
  vocab: vocabRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
