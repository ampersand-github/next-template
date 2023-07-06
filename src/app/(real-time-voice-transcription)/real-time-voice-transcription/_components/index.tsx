"use client";
import { SpeechRecognitionPresenter } from "@/app/(real-time-voice-transcription)/real-time-voice-transcription/_components/index.presenter";
import React, { useCallback, useState } from "react";

type SpeechRecognitionResult = {
  results: SpeechRecognitionResultList;
  resultIndex: number;
};

// 新しい音声認識インスタンスを作成し、設定を行う
const initializeRecognition = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "ja";
  recognition.interimResults = true;
  recognition.continuous = true;
  return recognition;
};

const StatusMessages = {
  recognizing: "認識中",
  tryAgain: "もう一度試してください",
  error: "エラー",
  stopped: "停止中",
  start: "start",
};

export const SpeechRecognitionApp: React.FC = () => {
  const [resultText, setResultText] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // 音声認識の結果を処理するためのコールバック関数
  const handleResult = useCallback((event: SpeechRecognitionResult) => {
    const newTranscripts = Array.from(event.results)
      .slice(event.resultIndex)
      .map((result) => result[0].transcript)
      .join("");

    const isFinal = event.results[event.resultIndex].isFinal;
    const displayTranscript = isFinal
      ? newTranscripts
      : `[途中経過] ${newTranscripts}`;

    setResultText(displayTranscript);

    if (isFinal) {
      // 既存のデータを取得
      const existingData = localStorage.getItem("transcript") || "";
      // 新しいデータを追加
      const updatedData = `${existingData}${newTranscripts}\n`;
      // 更新されたデータを保存
      localStorage.setItem("transcript", updatedData);
    }
  }, []);

  // 音声認識を開始するためのコールバック関数
  const vrFunction = useCallback(() => {
    const recognition = initializeRecognition();

    recognition.onsoundstart = () => setStatus(StatusMessages.recognizing);
    recognition.onnomatch = () => setStatus(StatusMessages.tryAgain);
    recognition.onerror = () => setStatus(StatusMessages.error);
    recognition.onsoundend = () => {
      setStatus(StatusMessages.stopped);
      vrFunction();
    };
    recognition.onresult = handleResult;

    setStatus(StatusMessages.start);
    recognition.start();
  }, [handleResult]);

  return (
    <SpeechRecognitionPresenter
      vrFunction={vrFunction}
      resultText={resultText}
      status={status}
    />
  );
};
