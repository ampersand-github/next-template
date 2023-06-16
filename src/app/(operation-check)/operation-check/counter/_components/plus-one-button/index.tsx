"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { url } from "@/lib/url";
import { redirect, useRouter } from "next/navigation";

type Props = {
  count: number;
};

export const PlusOneButton = async ({ count }: Props) => {
  const router = useRouter();
  const handleClick = async () => {
    // request
    const apiUrl = `${env.NEXT_PUBLIC_ORIGIN}/api/counter`;
    const body = JSON.stringify({ count: count + 1 });
    const res = await fetch(apiUrl, { body, method: "PATCH" });

    // responseチェック
    if (!res.ok) {
      if (res.status === 401) redirect(url.LOGIN);
      toast({
        description: "カウントアップができませんでした",
        variant: "error",
      });
      throw new Error("カウントアップができませんでした");
    }

    router.refresh();
  };

  return <Button onClick={handleClick}>+1</Button>;
};
