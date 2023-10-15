import React from "react";
import { IPopconfirmComponent } from "react-flow-builder";

export const PopConfirm: React.FC<IPopconfirmComponent> = ({
  onConfirm,
  children,
}) => {
  return <div onClick={onConfirm}>{children}</div>;
};
