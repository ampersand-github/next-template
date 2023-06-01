"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
  AddressProps,
  isAddressSelectDialogOpenAtom,
  selectedAddressAtom,
} from "../../address-form/address-form";

type props = {
  items: [AddressProps, ...AddressProps[]];
};

export const AddressSelectDialog = ({ items }: props) => {
  const [isOpen, setIsOpen] = useAtom(isAddressSelectDialogOpenAtom);
  const [_, setSelected] = useAtom(selectedAddressAtom);
  const form = useForm();
  const handleChange = async (data: any) => {
    console.log(data);
    setSelected(items[Number(data)]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      {/*
         <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
       */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleChange}
                    className="flex flex-col space-y-1"
                  >
                    {items.map((item, index) => {
                      const value = `${item.prefecture} ${item.city} ${item.town}`;
                      return (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={String(index)} />
                          </FormControl>
                          <FormLabel className="font-normal">{value}</FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};
