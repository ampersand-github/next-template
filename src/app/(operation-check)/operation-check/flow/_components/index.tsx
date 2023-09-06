"use client";

import React, { useContext, useState } from "react";
import FlowBuilder, {
  BuilderContext,
  IDrawerComponent,
  INode,
  IPopconfirmComponent,
  IPopoverComponent,
  IRegisterNode,
  useDrawer,
} from "react-flow-builder";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/__shared__/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/__shared__/components/ui/sheet";
import ConfigForm from "@/app/(operation-check)/operation-check/flow/_components/config-form";
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
    configComponent: ConfigForm,
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
      DrawerComponent={DrawerComponent}
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
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent side={"right"} className={"w-full"}>
        {content}
      </PopoverContent>
    </Popover>
  ) : (
    <div className={overlayClassName} onClick={handleAddNode}>
      {children}
    </div>
  );
};

const DrawerComponent: React.FC<IDrawerComponent> = ({
  visible,
  onClose,
  children,
}: IDrawerComponent) => {
  const drawer = useDrawer();

  const context = useContext(BuilderContext);
  const [isOpen, setOpen] = useState(false);

  return { visible } ? (
    <Sheet open={isOpen}>
      <SheetTrigger onClick={() => setOpen(!isOpen)}>Openss</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ) : (
    <div>not visible</div>
  );
};
