"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { isAddressSelectDialogOpenAtom, selectedAddressAtom } from "../";
import { IAddress } from "../address-interface";

type props = {
  items: [IAddress, ...IAddress[]];
};

export const AddressSelectDialog = ({ items }: props) => {
  const [isOpen, setIsOpen] = useAtom(isAddressSelectDialogOpenAtom);
  const [_, setSelected] = useAtom(selectedAddressAtom);
  const handleChange = async (data: any) => {
    console.log(data);
    setSelected(items[Number(data)]);
    setIsOpen(false);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      {/*
         <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
       */}
      <DialogContent className="mt-8 max-h-[calc(100%_-_64px)] max-w-[calc(100%_-_64px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>住所選択</DialogTitle>
          <DialogDescription>
            以下のリストから住所を選択してください。選択した住所は変更できます。
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          onValueChange={handleChange}
          className="flex flex-col space-y-1"
        >
          {items.map((item, index) => {
            const value = `${item.prefecture} ${item.city} ${item.town}`;
            return (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={String(index)} id={String(index)} />
                <Label htmlFor={String(index)}>{value}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};
