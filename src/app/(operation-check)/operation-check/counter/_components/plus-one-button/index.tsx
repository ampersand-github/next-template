"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";

type Props = {
  count: number;
};
export const PlusOneButton = async ({ count }: Props) => {
  const handleClick = async () => {
    console.log(count + 1);
    const result = await fetch(`${env.NEXT_PUBLIC_ORIGIN}/api/counter`, {
      body: JSON.stringify({ count: count + 1 }),
      method: "PATCH",
    });
    // todo result型判断
    console.log(result);

    window.location.reload();
  };

  return <Button onClick={handleClick}>+1</Button>;
};
