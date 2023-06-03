import { IAddress } from "../address-interface";

export const fetchCandidateAddress = async (
  postalCode: string
): Promise<IAddress[]> => {
  const url = new URL("https://zipcloud.ibsnet.co.jp/api/search");
  url.searchParams.append("zipcode", postalCode);
  const response = await fetch(url);
  const { results } = await response.json();
  if (!results) return [];
  // todo resultsの値の型チェックしたい
  // todo テストしたい
  return results.map((result: any) => {
    const { address1, address2, address3 } = result;
    return {
      prefecture: address1,
      city: address2,
      town: address3,
    };
  });
};
