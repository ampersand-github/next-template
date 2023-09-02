import React, { useContext } from "react";
import { INodeContext, NodeContext } from "react-flow-builder";

export const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">{node.name}</div>;
};

export const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

export const OtherNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="other-node">{node.name}</div>;
};

export const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="condition-node">{node.name}</div>;
};
// - - -
type NodeType = {
  configuring?: boolean;
  validateStatusError?: boolean;
};
const getNodeClassName = (baseClass: string, node: NodeType): string => {
  return `${baseClass} ${node.configuring ? "node-configuring" : ""} ${
    node.validateStatusError ? "node-status-error" : ""
  }`;
};

export const NodeDisplay: React.FC<{ baseClass: string }> = ({ baseClass }) => {
  const node: INodeContext = useContext(NodeContext);
  const status = node.data?.status;

  return (
    <div className={getNodeClassName(baseClass, node)}>
      {node.data ? node.data.name : node.name}
      {JSON.stringify(status)}
    </div>
  );
};
