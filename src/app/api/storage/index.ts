import { env } from "@/env.mjs";
import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
  projectId: env.GCP_PROJECT_ID,
  keyFilename: "next-template-staging.json",
});
