"use client";

import Editor from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getGenerativeAIResponse } from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Copy, Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Company } from "@/lib/generated/prisma";

interface WhyJoinUsFormProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  whyJoinUs: z.string().min(1),
});

export default function WhyJoinUsForm({ initialData, companyId }: WhyJoinUsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rollname, setRollname] = useState("");
  const [aiValue, setAiValue] = useState("");
  const [isPrompting, setIsPrompting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whyJoinUs: initialData?.whyJoinUs || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/companies/${companyId}`, values);
      toast.success("Updated successfully");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handlePromptGeneration = async () => {
    if (!rollname.trim()) return toast.error("Enter company name first");

    try {
      setIsPrompting(true);
      const prompt = `Create a compelling "Why join us" section for ${rollname}.`;

      const data = await getGenerativeAIResponse(prompt);
      const cleaned = data.replace(/^'|'$/g, "").replace(/[\*#]/g, "");

      setAiValue(cleaned);
    } catch (e: any) {
      toast.error(e?.message || "AI failed");
    } finally {
      setIsPrompting(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(aiValue);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Why Join Us
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? "Cancel" : <>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </>}
        </Button>
      </div>

      {!isEditing && (
        <div className={cn("text-sm mt-2", !initialData.whyJoinUs && "text-neutral-500 italic")}>
          {!initialData.whyJoinUs ? "No Details" : <Preview value={initialData.whyJoinUs} />}
        </div>
      )}

      {isEditing && (
        <>
          <div className="flex gap-2 my-2">
            <input
              value={rollname}
              onChange={(e) => setRollname(e.target.value)}
              placeholder="e.g. Narayan Construction"
              className="w-full p-2 rounded-md border"
            />
            <Button onClick={handlePromptGeneration} disabled={isPrompting}>
              {isPrompting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-right">
            Type company name to generate content
          </p>

          {aiValue && (
            <div className="relative mt-4 p-3 bg-white rounded-md max-h-96 overflow-y-scroll text-sm">
              {aiValue}
              <Button size="icon" variant="outline" className="absolute top-3 right-3" onClick={onCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="whyJoinUs"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
