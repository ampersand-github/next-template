import { Meta, StoryObj } from "@storybook/react";
import { SpeechRecognitionPresenter } from "./index.presenter";

export default {
  title: "real-time-voice-transcription/SpeechRecognitionPresenter",
  component: SpeechRecognitionPresenter,
} as Meta;

type Story = StoryObj<typeof SpeechRecognitionPresenter>;
export const Default: Story = {
  args: {
    resultText: "これはサンプルの音声テキストです。",
    status: "準備完了",
    vrFunction: () => alert("録音開始"),
  },
};
export const Recording: Story = {
  args: {
    resultText: "これは録音中のサンプル音声テキストです。",
    status: "録音中",
    vrFunction: () => alert("録音開始"),
  },
};
