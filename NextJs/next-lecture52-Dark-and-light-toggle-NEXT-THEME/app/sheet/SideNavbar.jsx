"use client";

import Link from "next/link";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";
import "../../app/globals.css"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export default function SideNavbar() {
  return (
    <Sheet>
      {/* Toggle Button */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Sidebar */}
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl font-bold">
            My Dashboard
          </SheetTitle>
        </SheetHeader>

        {/* Menu */}
        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>

          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
