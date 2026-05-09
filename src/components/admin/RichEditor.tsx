"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[200px] p-4 focus:outline-none",
        style: "font-family: var(--font-commissioner); font-size: 16px; color: #1c1d1e;",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. when loading existing event)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="border border-[#e4d5b2] rounded-[8px] overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#e4d5b2] bg-[#fdf5f2]">
        {[
          { label: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
          { label: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
          { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
          { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
          { label: "• List", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
          { label: "1. List", action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            className="px-2 py-1 rounded text-sm transition-colors"
            style={{
              fontFamily: "var(--font-commissioner)",
              fontSize: "13px",
              fontWeight: btn.active ? 700 : 400,
              backgroundColor: btn.active ? "#bea055" : "transparent",
              color: btn.active ? "#fdf5f2" : "#292929",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div style={{ minHeight: "200px" }}>
        {!editor?.getText() && placeholder && (
          <p
            className="absolute pointer-events-none p-4"
            style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#9ca3af" }}
          >
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
