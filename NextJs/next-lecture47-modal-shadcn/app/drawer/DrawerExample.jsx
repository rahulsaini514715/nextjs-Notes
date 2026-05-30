"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../../app/components/ui/drawer";

export default function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Profile Settings</DrawerTitle>
          <DrawerDescription>
            Manage your account settings here.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
          />
        </div>

        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
