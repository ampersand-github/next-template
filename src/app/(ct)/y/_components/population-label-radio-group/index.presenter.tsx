import { Label } from "@/__shared__/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/__shared__/components/ui/radio-group";
import { PopulationLabel } from "../..";

type Props = {
  handleClick: (label: PopulationLabel) => void;
};

export const PopulationLabelRadioGroupPresenter = ({ handleClick }: Props) => {
  return (
    <RadioGroup
      defaultValue="総人口"
      className={"flex justify-center"}
      onValueChange={(label: PopulationLabel) => handleClick(label)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="総人口" id="r1" />
        <Label htmlFor="r1">総人口</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="年少人口" id="r2" />
        <Label htmlFor="r2">年少人口</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="生産年齢人口" id="r3" />
        <Label htmlFor="r3">生産年齢人口</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="老年人口" id="r4" />
        <Label htmlFor="r4">老年人口</Label>
      </div>
    </RadioGroup>
  );
};
