"use client";

import ComboBox from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Job } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ShiftTimingFormProps {
  initialData: Job;
  jobId: string;
}

const options = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
];

const formSchema = z.object({
  shiftTiming: z.string().min(1, "Shift timing is required"),
});

const ShiftTimingForm = ({ initialData, jobId }: ShiftTimingFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shiftTiming: initialData?.shiftTiming || "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEditing = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/jobs/${jobId}`, values);
      toast.success("Updated successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.shiftTiming
  );

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Job Shift Timing
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Display when not editing */}
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.shiftTiming && "text-neutral-500 italic"
          )}
        >
          {selectedOption?.label || "No Timing Added"}
        </p>
      )}

      {/* Display when editing */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="shiftTiming"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox heading="Shift Timing" options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ShiftTimingForm;
