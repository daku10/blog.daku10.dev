import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    NEXT_PUBLIC_APP_ENV: z.union([
      z.literal("production"),
      z.literal("development"),
    ]),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GA_ID: process.env["NEXT_PUBLIC_GA_ID"],
    NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
  },
});
