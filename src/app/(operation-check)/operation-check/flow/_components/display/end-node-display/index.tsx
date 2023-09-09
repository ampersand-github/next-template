"use client";
import React from "react";

type props = {
  name: string;
};
export const EndNodeDisplay: React.FC<props> = ({ name }: props) => {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-500 text-center text-white">
      {name}
    </div>
  );
};
