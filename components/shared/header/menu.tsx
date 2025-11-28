import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCartIcon /> Cart
          </Link>
        </Button>
        <Button asChild variant="default">
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle cursor-pointer">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex felx-col items-start p-5">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link href="/cart">
                <ShoppingCartIcon /> Cart
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/sign-in">
                <UserIcon /> Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Menu;
