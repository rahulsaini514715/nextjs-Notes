"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AppliedFilter {
  value: string;
  label: string;
  checked?: boolean;
}

interface CheckBoxContainerProps {
  data: AppliedFilter[];
  onChange: (dataValues: string[]) => void;
}

export const CheckBoxContainer = ({
  data,
  onChange,
}: CheckBoxContainerProps) => {
  const [filters, setFilters] = useState<AppliedFilter[]>(data);

  useEffect(() => {
    setFilters(data);
  }, [data]);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      {filters.map((item) => (
        <div key={item.value} className={cn("flex items-center gap-2",item.checked ? "text-purple-500" : "text-muted-foreground")}>
          <Checkbox checked={item.checked || false} onCheckedChange={()=> handleCheckedChange(item)}/>
          {item.label}
        </div>
      ))}
    </div>
  );
};
