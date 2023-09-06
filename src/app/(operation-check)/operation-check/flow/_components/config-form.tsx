import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/__shared__/components/ui/sheet";
import React, { useContext, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";

const ConfigForm: React.FC = () => {
  const { selectedNode: node } = useContext(BuilderContext);
  const [isOpen, setOpen] = useState(false);
  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
  console.log("context.selectedNode", node);

  const handleSubmit = async () => {};

  return (
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
  );
};

export default ConfigForm;
