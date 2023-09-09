import { INode } from "react-flow-builder";

type Props = {
  node: INode;
};
export const NodeUi = ({ node }: Props) => {
  const formatDate = (date: string) => {
    const _date = new Date(date);
    // 2023/01/01
    const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, "0");
    const day = _date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="h-30 flex w-56 flex-col rounded bg-white p-4 text-gray-600 shadow-md">
      <p>{node.title}</p>
      <p>{node.assigned}</p>
      <p>{node.deadline ? formatDate(node.deadline) : ""}</p>
      <p>{node.status}</p>
    </div>
  );
};
