import { auth } from "@/auth";
import AddToCart from "@/components/shared/product/add-to-cart";
import ProductImages from "@/components/shared/product/product-images";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ReviewList from "./review-list";

async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const session = await auth();
  const userId = session?.user.id;

  const cart = await getMyCart();
  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8 gap-y-8 ">
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>

          <div className="col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-6 border-b border-gray-200 pb-8">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {product.brand} · {product.category}
              </p>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>★ {product.rating.toString()}</span>
                <span>·</span>
                <span>
                  {product.numReviews}{" "}
                  {product.numReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
              <div className="flex items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="text-2xl text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                Description
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="col-span-1 ">
            <Card className="border border-gray-200 bg-white ">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Price</div>
                  <div>
                    <ProductPrice
                      value={Number(product.price)}
                      className="text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>

                {product.stock > 0 && (
                  <AddToCart
                    cart={cart}
                    item={{
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      image: product.images[0],
                      price: product.price,
                      qty: 1,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-light text-gray-900 tracking-tight leading-tight">
          Reviews
        </h2>
        <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
}

export default ProductDetailPage;
