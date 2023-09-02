"use client";

import React, { useState } from "react";
import FlowBuilder, {
  INode,
  IPopconfirmComponent,
  IPopoverComponent,
  IRegisterNode,
} from "react-flow-builder";

import { defaultNodes } from "./default-node";
import {
  ConditionNodeDisplay,
  EndNodeDisplay,
  NodeDisplay,
  OtherNodeDisplay,
  StartNodeDisplay,
} from "./display";
import "./index.css";

const registerNodes: IRegisterNode[] = [
  {
    type: "start",
    name: "start node",
    displayComponent: StartNodeDisplay,
    isStart: true,
  },
  {
    type: "end",
    name: "end node",
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: "node",
    name: "単一ノード",
    displayComponent: OtherNodeDisplay,
  },
  {
    type: "condition",
    name: "condition node",
    displayComponent: ConditionNodeDisplay,
  },
  {
    type: "branch",
    name: "ブランチノード",
    conditionNodeType: "condition",
  },
  {
    type: "loop",
    name: "ループ",
    displayComponent: () => <NodeDisplay baseClass="other-node" />,
    isLoop: true,
  },
];

export const Container = () => {
  const [nodes, setNodes] = useState<INode[]>(defaultNodes);

  const handleChange = (nodes: INode[]) => {
    console.log("nodes change", nodes);
    setNodes(nodes);
  };

  return (
    <FlowBuilder
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
      historyTool
      zoomTool
      PopconfirmComponent={DummyPopConfirm}
      PopoverComponent={DummyPopover}
    />
  );
};

const DummyPopConfirm: React.FC<IPopconfirmComponent> = ({
  title,
  onConfirm,
  getPopupContainer,
  children,
}) => {
  return <div onClick={onConfirm}>{children}</div>;
};

const DummyPopover: React.FC<IPopoverComponent> = ({
  visible,
  onVisibleChange,
  overlayClassName,
  placement,
  trigger,
  content,
  getPopupContainer,
  children,
}) => {
  const handleAddNode = () => {
    onVisibleChange(!visible);
  };

  return visible ? (
    <div className={"flex flex-row space-x-2"}>
      {children}
      <div className={"bg-white"}>{content}</div>
    </div>
  ) : (
    <div className={overlayClassName} onClick={handleAddNode}>
      {children}
    </div>
  );
};
