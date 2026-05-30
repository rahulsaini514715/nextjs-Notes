"use client";

import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import "../../app/globals.css"
export default function ToastExample() {
  return (
    <div className="space-x-2">
      <Button onClick={() => toast.success("Login successful!")}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>Error</Button>
      <Button onClick={() => toast("This is a normal toast")}>Default</Button>
    </div>
  );
}
