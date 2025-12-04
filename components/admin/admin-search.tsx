"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

function AdminSearch() {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/products")
    ? "/admin/products"
    : "/admin/users";

  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [queryValue, setQueryValue] = useState(query);

  useEffect(() => {
    setQueryValue(query);
  }, [query]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-60 lg:w-90"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
}

export default AdminSearch;
