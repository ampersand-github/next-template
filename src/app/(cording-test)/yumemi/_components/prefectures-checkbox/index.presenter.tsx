import { Checkbox } from "@/__shared__/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox/dist";

type Props = {
  prefCode: number;
  prefName: string;
  handleChange: (checked: CheckedState) => void;
};

export const PrefecturesCheckboxPresenter = ({
  prefCode,
  prefName,
  handleChange,
}: Props) => {
  return (
    <div className={"flex flex-row items-center space-x-1 p-2"}>
      <Checkbox id={prefCode.toString()} onCheckedChange={handleChange} />
      <label
        htmlFor={prefCode.toString()}
        className="w-16 text-sm font-medium leading-none"
      >
        {prefName}
      </label>
    </div>
  );
};
