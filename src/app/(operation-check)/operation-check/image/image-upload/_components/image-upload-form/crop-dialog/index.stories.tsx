import type { Meta, StoryObj } from "@storybook/react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { cropperImageAtom } from "../index";
import { CropperDialog } from "./index";

const meta: Meta<typeof CropperDialog> = {
  title: "components/operation-check/crop/CropperDialog",
  component: CropperDialog,
  decorators: [
    (Story) => {
      const image = useAtomValue(cropperImageAtom);
      return (
        <>
          <Story />
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt={"preview"}
              width={1600}
              height={900}
            />
          )}
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CropperDialog>;

export const Default: Story = {};
