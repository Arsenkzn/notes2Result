import { marked } from "marked";
import DOMPurify from "dompurify";
import { Box } from "@mantine/core";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = DOMPurify.sanitize(marked.parse(content) as string);

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ flex: 1, overflow: "auto" }}
    />
  );
}
