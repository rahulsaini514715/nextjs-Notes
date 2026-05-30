"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const quill = await import("react-quill-new");
          return quill.default;
        },
        { ssr: false }
      ),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill value={value} theme="bubble" readOnly />
    </div>
  );
};
