import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Firbidden access",
};
function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Forbidden</h1>
        <p className="text-destructive">
          You do not have permission to access this page
        </p>
        <Link href="/">
          <Button variant="outline" className="mt-4 ml-2 ">
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
