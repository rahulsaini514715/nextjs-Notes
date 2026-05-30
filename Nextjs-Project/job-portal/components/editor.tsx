"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
};

export default Editor;
