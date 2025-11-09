"use client";

import DOMPurify from "dompurify";
import { marked } from "marked";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <div
      className="markdown-viewer prose prose-sm md:prose-md lg:prose-lg xl:prose-xl max-w-none"
      dangerouslySetInnerHTML={{
        __html: marked.parse(DOMPurify.sanitize(content), {
          async: false,
        }) as string,
      }}
    />
  );
};

export default MarkdownViewer;
