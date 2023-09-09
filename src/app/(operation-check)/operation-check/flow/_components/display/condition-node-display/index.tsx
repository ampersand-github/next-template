"use client";
import React, { useContext } from "react";
import { NodeContext } from "react-flow-builder";

export const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div className="h-10 w-56 rounded bg-white p-3 text-gray-600">
      {node.name}
    </div>
  );
};
