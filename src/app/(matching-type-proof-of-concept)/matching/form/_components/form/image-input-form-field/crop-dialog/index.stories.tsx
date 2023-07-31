import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { useState } from "react";
import { CropperDialog } from "./index";

const meta: Meta<typeof CropperDialog> = {
  title: "components/matching/crop/CropperDialog",
  component: CropperDialog,
  decorators: [
    (Story) => {
      const [image, setImage] = useState<File>();
      const onTrimming = (file: File) => {
        setImage(file);
      };
      return (
        <>
          <Story args={{ onTrimming: onTrimming }} />
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
