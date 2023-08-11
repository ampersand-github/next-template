import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Step1Container } from "./";

const meta: Meta<typeof Step1Container> = {
  title: "components/step1/Step1Container",
  component: Step1Container,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Step1Container>;
export const Default: Story = {
  args: {},
};

export const Play: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const combobox = canvas.getByRole("combobox", { name: "select-product" });
    await userEvent.click(combobox);
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{enter}");
    expect(combobox.querySelector("span")?.textContent).toMatch("Flower");

    const combobox2 = canvas.getByRole("combobox", { name: "select-option" });
    await userEvent.click(combobox2);
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{enter}");

    await userEvent.click(canvas.getByRole("button", { name: "submit" }));
  },
};
//<select aria-hidden="true" tabIndex="-1" style="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"><option value="PC">PC</option><option value="Flower">Flower</option><option value="Car">Car</option></select>
