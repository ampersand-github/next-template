import { Badge } from "@/__shared__/components/ui/badge";
import { Separator } from "@/__shared__/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/__shared__/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AlarmCheck } from "lucide-react";
import { INode } from "react-flow-builder";

type Props = {
  node: INode;
};

export const NodeUi = ({ node }: Props) => {
  const isDeadlineOver = (): boolean => {
    const nodeDeadline = new Date(node.deadline as string);
    return nodeDeadline > new Date();
  };
  const whenStatus = (): string => {
    if (node.status !== "完了" && isDeadlineOver())
      return "border border-red-500";
    if (node.status === "未着手") return "bg-white border border-gray-500";
    if (node.status === "着手中") return "border border-blue-500";
    if (node.status === "完了") return "bg-gray-500";
    return "";
  };

  return (
    <div
      className={` flex w-60 flex-col rounded p-4 shadow-md ${whenStatus()} `}
    >
      <div className={"grow p-2"}>
        {node.status && <Status status={node.status} />}
        <NodeTitle title={node.title as string} />
      </div>
      {node.name && node.deadline && (
        <div>
          <Separator />
          <div className={"flex flex-row items-center justify-between pt-4"}>
            {node.deadline && <DeadLine deadline={node.deadline} />}
            {node.assigned && <UserIcon name={node.assigned} />}
          </div>
        </div>
      )}
    </div>
  );
};

const DeadLine = ({ deadline }: { deadline: string | undefined }) => {
  const formatDate = (date: string) => {
    const _date = new Date(date);
    // 2023/01/01
    // const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, "0");
    const day = _date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  return (
    <div className={"flex flex-row items-center justify-center"}>
      <AlarmCheck className={"mr-1 w-4 text-muted-foreground"} />
      <p className={"text-sm text-muted-foreground"}>
        {deadline ? formatDate(deadline) : ""}
      </p>
    </div>
  );
};

const NodeTitle = ({ title }: { title: string }) => {
  return (
    <p className={"truncate py-2 text-center text-sm font-bold"}>{title}</p>
  );
};

const Status = ({ status }: { status: string }) => {
  const selectBg = () => {
    if (status === "未着手") return "bg-black";
    if (status === "着手中") return "bg-blue-500";
    if (status === "完了") return "bg-green-500";
    return "bg-green-500";
  };
  return (
    <Badge className={`mb-2 ${selectBg()} hover:${selectBg()}/80`}>
      {status}
    </Badge>
  );
};

const UserIcon = ({ name }: { name: string }) => {
  const strString = String(name);
  const name_2 = strString.slice(0, 4);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage src="" alt="user" />
            <AvatarFallback>
              <span className={"text-xs font-bold"}>{name_2}</span>
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
