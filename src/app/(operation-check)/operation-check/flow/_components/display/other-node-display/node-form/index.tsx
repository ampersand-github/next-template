import AutoForm, { AutoFormSubmit } from "@/__shared__/components/ui/auto-form";
import { useState } from "react";
import { INode } from "react-flow-builder";
import { z } from "zod";
import { RichEditor } from "./editor";

type props = {
  initialData: INode | undefined;
  handleSubmit: (data: any) => void;
};

const assigned: [string, ...string[]] = ["太郎", "次郎", "三郎"];
const status: [string, ...string[]] = ["未着手", "着手中", "完了"];

export const NodeForm = ({ initialData, handleSubmit }: props) => {
  const [editorValue, setEditorValue] = useState("");
  const handleEditorChange = (value: string) => setEditorValue(value);

  const schema = z.object({
    title: z.string().min(1).describe("タスク名"),
    assigned: z.enum(assigned).describe("担当者"),
    deadline: z.coerce.date().nullable().describe("期限"),
    status: z.enum(status).describe("ステータス"),
  });

  const value = {
    title: initialData?.title,
    assigned: initialData?.assigned,
    deadline: initialData?.deadline
      ? new Date(initialData?.deadline)
      : undefined,
    status: initialData?.status,
  };

  return (
    <AutoForm
      onSubmit={(data) => {
        handleSubmit({ ...data, content: editorValue });
      }}
      formSchema={schema}
      values={value}
      fieldConfig={{
        assigned: { fieldType: "select" },
        deadline: { fieldType: "date" },
        status: { fieldType: "select" },
      }}
    >
      <RichEditor
        onChange={handleEditorChange}
        defaultValue={initialData ? initialData.content : ""}
      />
      <AutoFormSubmit>Submit</AutoFormSubmit>
    </AutoForm>
  );
};
