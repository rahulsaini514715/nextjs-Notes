"use client";

import AttachmentsUploads from "@/components/attachments-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Job } from "@/lib/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { File, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

/* ---------------- Types ---------------- */

type Attachment = {
  url: string;
  name: string;
};

interface AttachmentsFormProps {
  initialData: Job;
  jobId: string;
}

/* ---------------- Schema ---------------- */

const formSchema = z.object({
  attachment: z
    .object({
      url: z.string(),
      name: z.string(),
    })
    .array(),
});

/* ---------------- Component ---------------- */

const AttachmentsForm = ({ initialData, jobId }: AttachmentsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  /* ---- Safely normalize Prisma JsonValue[] ---- */
  const initialAttachments: Attachment[] = useMemo(() => {
    if (!Array.isArray(initialData?.attachment)) return [];

    return (initialData.attachment as unknown[])
      .filter(
        (a): a is Attachment =>
          typeof a === "object" &&
          a !== null &&
          "url" in a &&
          "name" in a &&
          typeof (a as any).url === "string" &&
          typeof (a as any).name === "string"
      )
      .map((a) => ({
        url: a.url,
        name: a.name,
      }));
  }, [initialData?.attachment]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachment: initialAttachments,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Updated successfully");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ---- Delete single attachment ---- */
  const onDelete = async (url: string) => {
    try {
      const updated = initialAttachments.filter((file) => file.url !== url);

      await axios.patch(`/api/jobs/${jobId}`, { attachment: updated });

      toast.success("File removed");
      router.refresh();
    } catch {
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Job Attachments
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* -------- DISPLAY MODE -------- */}
      {!isEditing && (
        <>
          {initialAttachments.length === 0 && (
            <p className="text-sm text-muted-foreground italic mt-2">
              No attachments
            </p>
          )}

          {initialAttachments.map((file) => (
            <div
              key={file.url}
              className="p-3 mt-2 w-full bg-purple-100 border-purple-200 border text-purple-700 rounded-md flex items-center"
            >
              <File className="w-4 h-4 mr-2" />
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs w-full truncate"
              >
                {file.name}
              </a>
              <button onClick={() => onDelete(file.url)}>
                <X className="w-4 h-4 text-red-500 ml-2" />
              </button>
            </div>
          ))}
        </>
      )}

      {/* -------- EDIT MODE -------- */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AttachmentsUploads
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(val) => field.onChange(val)}
                      onRemove={() => field.onChange([])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AttachmentsForm;










// "use client"

// import AttachmentsUploads from "@/components/attachments-upload";
// import ImageUpload from "@/components/image-upload";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Job } from "@/lib/generated/prisma";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { ImageIcon, Pencil } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { on } from "node:stream";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import {z} from "zod";

// interface AttachmentsFormProps{
//     initialData : Job 
//     jobId : string
// }

// // const formSchema = z.object({
// //     attachment: z.string().min(1),
// // }) ;
// const formSchema = z.object({
//   attachment: z.object({url : z.string(), name : z.string()}).array(),
// });


// const AttachmentsForm=({initialData, jobId} : AttachmentsFormProps)=> {
//     const [isEditing, setIsEditing] = useState(false);
//     const router = useRouter();

//     // Assuming initialData is available and has type of any
// const initialAttachments = Array.isArray(initialData?.attachment)
//   ? initialData.attachment.map((attachment: any) => {
//       if (
//         typeof attachment === "object" &&
//         attachment !== null &&
//         "url" in attachment &&
//         "name" in attachment
//       ) {
//         return { url: attachment.url, name: attachment.name };
//       }

//       // Provide default values if the shape is incorrect
//       return { url: "", name: "" };
//     })
//   : [];


//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver : zodResolver(formSchema),
//         defaultValues : {
//            attachment: initialAttachments,
//         }
//     })

//     const {isSubmitting, isValid} = form.formState

//     const onSubmit = async(values : z.infer<typeof formSchema>)=>{
//       try{
//         const response = await axios.patch(`/api/jobs/${jobId}`,values);
//         toast.success("Updated successfully")
//         toggleEditing();
//         router.refresh();
//       }catch(error){
//         toast.error("Something went wrong");
//       }
//     }

//     const toggleEditing = ()=> setIsEditing(current => !current)
//   return (
//     <div className="mt-6 border bg-neutral-100 rounded-md p-4">
//         <div className="font-medium flex items-center justify-between">
//             Job Attachments
//             <Button onClick={toggleEditing} variant={"ghost"}>
//                 {isEditing ? (<>Cancel</>) : (<><Pencil className="w-4 h-4 mr-2"/>Edit</>)}
//             </Button>
//         </div>

//         {/* display the attachment if not editing  */}
//         {!isEditing && <>
           
           

//         </>}

//         {/* on editing mode display the input  */}
//         {isEditing && (
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
//                    <FormField 
//                         control={form.control}
//                         name="attachment"
//                         render={({ field }) => {
//                           return (
//                             <FormItem>
//                               <FormControl>
//                                  <AttachmentsUploads 
//                                     value={field.value || ""}
//                                     disabled={isSubmitting}
//                                     onChange={(url)=> field.onChange(url)}
//                                     onRemove={()=> field.onChange("")}
//                                  />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           );
//                         }}
//                       />
//                       <div className="flex items-center gap-x-2">
//                         <Button disabled={!isValid || isSubmitting } type="submit">
//                           Save
//                         </Button>
//                       </div>
//                 </form>
//             </Form>
//         )}
//     </div>
//   )
// }

// export default AttachmentsForm




