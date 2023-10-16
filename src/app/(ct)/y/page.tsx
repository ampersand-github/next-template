import { url } from "@/__shared__/utils/url";
import { Container } from "@/app/(ct)/y/_components";
import { env } from "@/env.mjs";

export default async function Home() {
  const apiKey = env.RESAS_API_KEY;
  const prefecturesUrl = url.RESAS_BASE_URL + "/prefectures";
  const result = await fetch(prefecturesUrl, {
    headers: { "X-API-KEY": apiKey },
  });
  const json = await result.json();
  return <Container apiKey={apiKey} prefectures={json} />;
}
