import {
  EndNodeDisplay,
  OtherNodeDisplay,
  StartNodeDisplay,
} from "@/app/(operation-check)/operation-check/flow/_components/display";
import { INode, IRegisterNode } from "react-flow-builder";

type props = {
  handleChange: (nodes: INode[]) => void;
};

export const setRegisterNodes = ({ handleChange }: props): IRegisterNode[] => {
  return [
    {
      type: "start",
      name: "start node",
      displayComponent: () => <StartNodeDisplay name={"start"} />,
      isStart: true,
    },
    {
      type: "end",
      name: "end node",
      displayComponent: () => <EndNodeDisplay name={"end"} />,
      isEnd: true,
    },
    {
      type: "node",
      name: "タスク",
      displayComponent: () => <OtherNodeDisplay handleChange={handleChange} />,
    },
    {
      type: "condition",
      name: "condition node",
      displayComponent: () => <OtherNodeDisplay handleChange={handleChange} />,
    },
    {
      type: "branch",
      name: "分岐タスク",
      conditionNodeType: "condition",
    },
    {
      type: "loop",
      name: "ループタスク",
      displayComponent: () => <OtherNodeDisplay handleChange={handleChange} />,
      isLoop: true,
    },
  ];
};
