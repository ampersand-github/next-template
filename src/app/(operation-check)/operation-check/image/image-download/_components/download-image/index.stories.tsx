import { env } from "@/env.mjs";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { DownloadImage } from "./index";

const origin = env.NEXT_PUBLIC_ORIGIN;
const nextApiUrl = `${origin}/api/storage/simple/download`;
const dummyPhoto =
  "https://plus.unsplash.com/premium_photo-1686050416689-1b1f64fd5000";

const meta: Meta<typeof DownloadImage> = {
  title: "components/operation-check/image/DownloadImage",
  component: DownloadImage,
  parameters: {
    msw: {
      handlers: [
        rest.get(nextApiUrl, (req, res, ctx) => {
          return res(ctx.json({ url: dummyPhoto }));
        }),
      ],
    },
  },
  decorators: [
    (Story) => {
      const CustomErrorComponent = () => <div />;
      return (
        <ErrorBoundary errorComponent={CustomErrorComponent}>
          <Suspense fallback={<div>loading...</div>}>
            <Story />
          </Suspense>
        </ErrorBoundary>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DownloadImage>;

export const Default: Story = {
  args: {},
};