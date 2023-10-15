"use client";

import { useLocalStorage } from "@/__shared__/utils/functions/use-local-storage";
import { ReactFlowPopover } from "@/app/(operation-check)/operation-check/flow/_components/popover";
import { setRegisterNodes } from "@/app/(operation-check)/operation-check/flow/_components/resister-node";
import { useEffect, useState } from "react";
import FlowBuilder, { INode } from "react-flow-builder";
import { defaultNodes } from "./default-node";
import { PopConfirm } from "./pop-confirm";

export const Container = () => {
  const [value, setValue] = useLocalStorage({ key: "nodes" });
  const [nodes, setNodes] = useState<INode[]>(defaultNodes);

  // ローカルストレージから取得した値をセット
  useEffect(() => {
    if (value) setNodes(value);
  }, [value]);

  // データの保存
  const handleChange = (nodes: INode[]) => {
    setNodes(nodes);
    setValue(nodes);
  };

  // ノードの設定
  const registerNodes = setRegisterNodes({ handleChange });

  return (
    <FlowBuilder
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
      historyTool
      zoomTool
      PopconfirmComponent={PopConfirm} // 消すボダンの実装
      PopoverComponent={ReactFlowPopover} // *ボタンの実装
    />
  );
};
