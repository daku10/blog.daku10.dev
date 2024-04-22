import * as v from "valibot";

const schema = v.object({
  NEXT_PUBLIC_GA_ID: v.string([v.minLength(1)]),
  NEXT_PUBLIC_APP_ENV: v.union([
    v.literal("production"),
    v.literal("development"),
  ]),
});

export const env = v.parse(schema, {
  NEXT_PUBLIC_GA_ID: process.env["NEXT_PUBLIC_GA_ID"],
  NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
});
