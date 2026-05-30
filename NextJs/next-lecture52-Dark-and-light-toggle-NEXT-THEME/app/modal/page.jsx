
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button.tsx";
import "../../app/globals.css"

export default function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>

      <DialogContent >
      {/* <DialogContent showCloseButton={false}> */}
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
        </DialogHeader>

        <p>This is shadcn dialog modal</p>

        <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}



