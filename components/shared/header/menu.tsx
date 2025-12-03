import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";

function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1 items-center">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCartIcon /> Cart
          </Link>
        </Button>
        <UserButton />
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
            <UserButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Menu;
