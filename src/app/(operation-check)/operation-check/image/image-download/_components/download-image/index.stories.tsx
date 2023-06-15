import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { DownloadImagePresenter } from "./index.presenter";

// const origin = env.NEXT_PUBLIC_ORIGIN;
const origin = "http://localhost:3000";
const nextApiUrl = `${origin}/api/storage/simple/download`;
const dummyPhoto =
  "https://plus.unsplash.com/premium_photo-1686050416689-1b1f64fd5000";

const meta: Meta<typeof DownloadImagePresenter> = {
  title: "components/operation-check/image/DownloadImage",
  component: DownloadImagePresenter,
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

type Story = StoryObj<typeof DownloadImagePresenter>;

export const Default: Story = {
  args: { src: dummyPhoto },
};
