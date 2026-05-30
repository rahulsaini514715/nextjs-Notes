"use client";

import { File, FilePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Attachment {
  url: string;
  name: string;
}

interface AttachmentsUploadsProps {
  disabled?: boolean;
  onChange: (value: Attachment[]) => void;
  onRemove: (url: string) => void;
  value: Attachment[];
}

const AttachmentsUploads = ({ disabled, onChange, onRemove, value }: AttachmentsUploadsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;

  const files = Array.from(e.target.files);

  try {
    setLoading(true);

    const uploaded: Attachment[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");

      uploaded.push({ url: data.secure_url, name: file.name });
    }

    onChange([...(value || []), ...uploaded]);
    toast.success(`${uploaded.length} file(s) uploaded`);

    // Reset input so same file can be selected again
    e.target.value = "";
  } catch (error) {
    console.error(error);
    toast.error("Upload failed");
  } finally {
    setLoading(false);
  }
};


  const onDelete = (url: string) => {
    onRemove(url);
    toast.success("Removed");
  };

  return (
      <div className="space-y-2">
        {value.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {value.length} file(s) attached
        </p>
       )}

      {value?.length > 0 && (
        <div className="space-y-2">
          {value.map((file) => (
            <div key={file.url} className="p-3 w-full bg-purple-100 border-purple-200 border text-purple-700 rounded-md flex items-center">
              <File className="w-4 h-4 mr-2"/>
              <a href={file.url} target="_blank" className="text-xs w-full truncate">
                {file.name}
              </a>
              <button onClick={() => onDelete(file.url)} disabled={disabled}>
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex h-20 flex-col items-center justify-center border border-dashed rounded-md cursor-pointer">
        {isLoading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <FilePlus className="w-10 h-10" />
            <p>Upload a file</p>
          </>
        )}

        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={onUpload}
          multiple
          className="hidden"
          disabled={disabled || isLoading}
        />
      </label>
    </div>
  );
};

export default AttachmentsUploads;








