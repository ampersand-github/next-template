import { env } from "@/env.mjs";
import { Storage } from "@google-cloud/storage";
export const storage: Storage = new Storage({
  projectId: env.GCP_PROJECT_ID,
  credentials: {
    client_email: env.GCP_CLIENT_EMAIL.replace(/\\n/g, "\n"),
    private_key: env.GCP_PRIVATE_KEY,
  },
});
