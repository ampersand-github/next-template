import { SpeechRecognitionApp } from "./_components";

export default async function Page() {
  return (
    <main className="space-y-8 p-24">
      <h1 className="text-4xl font-bold">音声のリアルタイム文字起こし</h1>
      <SpeechRecognitionApp />
    </main>
  );
}
