"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button
      onClick={async (event) => {
        event.preventDefault();
        await signOut({ callbackUrl: `${window.location.origin}` });
      }}
    >
      ログアウト
    </Button>
  );
};
