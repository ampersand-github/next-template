import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/__shared__/components/ui/popover";
import React from "react";
import { IPopoverComponent } from "react-flow-builder";
import "./index.css";

export const ReactFlowPopover: React.FC<IPopoverComponent> = ({
  visible,
  onVisibleChange,
  overlayClassName,
  content,
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
