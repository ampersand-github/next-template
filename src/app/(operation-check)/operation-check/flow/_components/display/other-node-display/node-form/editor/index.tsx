"use client";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { AiOutlineLink } from "react-icons/ai";
import {
  MdCode,
  MdFormatBold,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdRedo,
  MdTaskAlt,
  MdTitle,
  MdUndo,
} from "react-icons/md";
import "./styles.scss";

const RichEditorToolbar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const _focus = editor.chain().focus();
  const buttonConfig = [
    {
      icon: <MdTitle />,
      action: () => _focus.toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <MdFormatBold />,
      action: () => _focus.toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <MdFormatStrikethrough />,
      action: () => _focus.toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <MdTaskAlt />,
      action: () => _focus.toggleTaskList().run(),
      isActive: editor.isActive("taskList"),
    },
    {
      icon: <MdCode />,
      action: () => _focus.toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
    {
      icon: <MdFormatListBulleted />,
      action: () => _focus.toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <MdFormatListNumbered />,
      action: () => _focus.toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <MdFormatQuote />,
      action: () => _focus.toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <AiOutlineLink />,
      action: setLink,
      isActive: editor.isActive("link"),
    },
    { icon: <MdUndo />, action: () => _focus.undo().run() },
    { icon: <MdRedo />, action: () => _focus.redo().run() },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-600 p-4 text-2xl">
      {buttonConfig.map((btn, idx) => (
        <button
          key={idx}
          type="button"
          onClick={btn.action}
          className={!btn.isActive ? "opacity-20" : ""}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type Props = {
  onChange: (value: string) => void;
  defaultValue: string;
};

export const RichEditor = ({ onChange, defaultValue }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: " flex  flex-row justify-center text-center items-center",
        },
      }),
      TaskList.configure({ HTMLAttributes: {} }),
      Link.configure({ openOnClick: true }),
    ],
    content: defaultValue ? JSON.parse(defaultValue) : "",
    onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
    editorProps: {
      attributes: {
        class: "prose prose-base m-5 focus:outline-none text-left",
      },
    }
  });

  if (!editor) return null;

  return (
    <div>
      <RichEditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={
          "flex h-[70vh] justify-start overflow-hidden overflow-y-scroll"
        }
      />
    </div>
  );
};
