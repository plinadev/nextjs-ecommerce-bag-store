"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
function Pagination({ page, totalPages, urlParamName }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = (type: "prev" | "next") => {
    const pageValue = type === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex gap-2 mt-5">
      <Button
        size="sm"
        variant="outline"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        <ArrowLeftIcon />
      </Button>

      <Button
        size="sm"
        variant="outline"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;
