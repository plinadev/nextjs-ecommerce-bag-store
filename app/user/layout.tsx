import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Menu from "@/components/shared/header/menu";
import Link from "next/link";
import MainNav from "./main-nav";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col ">
      <header className="w-full border-b">
        <div className="wrapper flex-between">
          <div className="flex-start">
            <Link href="/" className="flex-start ">
              <Image
                src="/logo.svg"
                alt={`${APP_NAME} logo`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="hidden lg:block font-bold text-2xl ml-3 ">
                {APP_NAME}
              </span>
            </Link>
            <MainNav className="mx-6" />
          </div>
          <Menu />
        </div>
      </header>
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
