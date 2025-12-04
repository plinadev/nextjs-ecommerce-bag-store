import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { DotIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const prices = [
  {
    name: "1$ to 1000$",
    value: "1-1000",
  },
  {
    name: "1000$ to 3000$",
    value: "1000-3000",
  },
  {
    name: "more than 3000$",
    value: "3000-100000",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = ["newest", "lowest", "highest", "rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""} ${isCategorySet ? category : ""} ${
        isPriceSet ? price : ""
      } ${isRatingSet ? rating : ""}`,
    };
  } else {
    return {
      title: "Search Iconic Bags",
    };
  }
}
async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <div className="text-xl mb-2 mt-3">Category</div>

        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`${
                  (category === "all" || category === "") && "font-bold"
                }`}
              >
                All
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  href={getFilterUrl({ c: x.category })}
                  className={`${category === x.category && "font-bold"}`}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl mb-2 mt-10">Price</div>

        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`${price === "all" && "font-bold"}`}
              >
                All
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${price === p.value && "font-bold"}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl mb-2 mt-10">Rating</div>

        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`${rating === "all" && "font-bold"}`}
              >
                All
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`${rating === r.toString() && "font-bold"}`}
                >
                  {`${r} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center gap-2 text-sm text-stone-700">
            {[
              q !== "all" && q !== "" && `Search: ${q}`,
              category !== "all" && category !== "" && `Category: ${category}`,
              price !== "all" && price !== "" && `Price: ${price}`,
              rating !== "all" &&
                rating !== "" &&
                `Rating: ${rating} stars and up`,
            ]
              .filter(Boolean)
              .map((item, index, arr) => (
                <span key={index} className="flex items-center">
                  {item}
                  {index < arr.length - 1 && <DotIcon />}
                </span>
              ))}

            {[
              q !== "all" && q !== "",
              category !== "all" && category !== "",
              price !== "all" && price !== "",
              rating !== "all" && rating !== "",
            ].some(Boolean) && (
              <Button size="sm" variant="secondary" asChild>
                <Link href="/search">Clear</Link>
              </Button>
            )}
          </div>
          <div className="flex text-sm">
            <p>Sort by: </p>
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort == s && "font-bold"}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          {products.data.length === 0 && <div>No products found.</div>}

          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
