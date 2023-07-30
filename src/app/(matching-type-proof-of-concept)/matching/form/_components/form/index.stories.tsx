import { FormValues } from "@/app/(matching-type-proof-of-concept)/matching/form/_components/form/index";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { MatchingFormPresenter } from "./index.presenter";

const meta: Meta<typeof MatchingFormPresenter> = {
  title: "components/matching/MatchingFormPresenter",
  component: MatchingFormPresenter,
  decorators: [
    (Story) => {
      const form = useForm<FormValues>({
        defaultValues: {},
      });

      return (
        <Story
          args={{
            form: form,
            onSubmit: (values) => {
              console.log(values);
            },
          }}
        />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MatchingFormPresenter>;
export const Default: Story = {
  args: {},
};
