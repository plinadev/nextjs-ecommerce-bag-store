import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ProductPrice from "./product-price";
import Link from "next/link";
import { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="pt-0 group w-full overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 ">
      <CardHeader className="p-0 relative overflow-hidden bg-gray-50">
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square overflow-hidden"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill={true}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </CardHeader>

      <CardContent className="p-6 space-y-2">
        <div className=" flex flex-col gap-2 min-h-30">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.brand}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed hover:text-gray-600 transition-colors duration-200">
              {product.name}
            </h2>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>★ {product.rating}</span>
            <span>·</span>
            <span>
              {product.numReviews}{" "}
              {product.numReviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 flex items-center justify-between">
        {product.stock > 0 ? (
          <ProductPrice
            value={Number(product.price)}
            className="text-gray-900"
          />
        ) : (
          <p className="text-sm text-gray-400">Out of stock</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
