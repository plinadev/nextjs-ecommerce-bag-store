import { Product } from "@/types";
import ProductCard from "./product-card";

function ProductList({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      {title && (
        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
          {title}
        </h2>
      )}

      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedData.map((product: Product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-gray-200 bg-gray-50">
          <p className="text-gray-500 text-sm">No products found</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
