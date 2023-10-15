import { url } from "@/__shared__/utils/url";
import { Container } from "@/app/(ct)/y/_components";
import { env } from "@/env.mjs";

const fetchPrefectures = async (apiKey: string, url: string) => {
  const result = await fetch(url, { headers: { "X-API-KEY": apiKey } });
  const json = await result.json();
  return json.result;
};

export default async function Home() {
  const apiKey = env.RESAS_API_KEY;
  const prefecturesUrl = url.RESAS_BASE_URL + "/prefectures";

  const prefectures = await fetchPrefectures(apiKey, prefecturesUrl);

  return <Container apiKey={apiKey} prefectures={prefectures} />;
}
