import AutoForm, { AutoFormSubmit } from "@/__shared__/components/ui/auto-form";
import { RichEditor2 } from "@/app/(operation-check)/operation-check/flow/_components/display/other-node-display/node-form/editor2";
import { useState } from "react";
import { INode } from "react-flow-builder";
import { z } from "zod";

type props = {
  initialData: INode | undefined;
  handleSubmit: (data: any) => void;
};

const assigned: [string, ...string[]] = ["太郎", "次郎", "三郎"];
const status: [string, ...string[]] = ["未着手", "着手中", "完了"];

export const NodeForm = ({ initialData, handleSubmit }: props) => {
  const [editorValue, setEditorValue] = useState("");
  const handleEditorChange = (value: string) => setEditorValue(value);
  const [isSubmitting, setSubmitting] = useState(false);

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
        if (!isSubmitting) return;
        handleSubmit({ ...data, content: editorValue });
        setSubmitting(false);
      }}
      formSchema={schema}
      values={value}
      fieldConfig={{
        assigned: { fieldType: "select" },
        deadline: { fieldType: "date" },
        status: { fieldType: "select" },
      }}
    >
      <RichEditor2 />
      {/*
            <RichEditor
        onChange={handleEditorChange}
        defaultValue={initialData ? initialData.content : ""}
      />
      */}
      <div onClick={() => setSubmitting(true)}>
        <AutoFormSubmit>Submit</AutoFormSubmit>
      </div>
    </AutoForm>
  );
};
