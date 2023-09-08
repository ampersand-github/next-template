"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/__shared__/components/ui/button";
import { Calendar } from "@/__shared__/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/__shared__/components/ui/popover";
import { forwardRef } from "react";
import { cn } from "@/__shared__/utils/cn";

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date;
    setDate: (date?: Date) => void;
  }
>(function DatePickerCmp({ date, setDate }, ref) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" ref={ref}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});
