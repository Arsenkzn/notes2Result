import { useEffect, useRef, useState } from "react";
import { Note } from "../../../entities/note/types";

interface MarkdownEditorProps {
  note: Note;
  onUpdate: (content: string) => void;
}

export function MarkdownEditor({ note, onUpdate }: MarkdownEditorProps) {
  const [localContent, setLocalContent] = useState(note.content);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localContent]);

  const handleChange = (newContent: string) => {
    setLocalContent(newContent);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onUpdate(newContent);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={localContent}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Начните вводить текст заметки здесь..."
      style={{
        width: "100%",
        minHeight: "200px",
        resize: "vertical",
        fontSize: "16px",
        lineHeight: "1.5",
        border: "1px solid black",
        borderRadius: "4px",
        fontFamily: "monospace",
        padding: "8px",
        boxSizing: "border-box",
      }}
    />
  );
}
