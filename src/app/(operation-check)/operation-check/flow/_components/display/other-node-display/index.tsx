"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/__shared__/components/ui/sheet";
import { useContext, useState } from "react";
import { BuilderContext, INode, NodeContext } from "react-flow-builder";
import { NodeForm } from "./node-form";
import { NodeUi } from "./node-ui";

type props = {
  handleChange: (nodes: INode[]) => void;
};
export const OtherNodeDisplay = ({ handleChange }: props) => {
  const node = useContext(NodeContext);
  const { nodes, onChange, selectedNode, setSelectedNode } =
    useContext(BuilderContext);
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = (data: INode) => {
    console.log(data);
    node.title = data.title;
    node.assigned = data.assigned;
    node.deadline = data.deadline;
    node.status = data.status;
    node.content = data.content;
    setSelectedNode(node);
    const newNodes = nodes.map((n) => {
      if (n.id === node.id) return node;
      return n;
    });
    handleChange(newNodes);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <SheetTrigger asChild>
        <div onClick={() => setOpen(!isOpen)}>
          <NodeUi node={node} />
        </div>
      </SheetTrigger>
      <SheetContent className={"min-w-full"}>
        <SheetHeader>
          <SheetTitle className={"bg-white text-left"}>タスク</SheetTitle>
          <SheetDescription>
            <NodeForm initialData={node} handleSubmit={handleSubmit} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
