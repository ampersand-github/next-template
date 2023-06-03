import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
// @ts-ignore
// TS2307: Cannot find module '@/components/ui/toaster' or its corresponding type declarations.
import { Toaster } from "@/components/ui/toaster";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "default",
      values: [
        { name: "default", value: "#F5F5F5" }, // gray-100
        { name: "light", value: "#fff" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default preview;
