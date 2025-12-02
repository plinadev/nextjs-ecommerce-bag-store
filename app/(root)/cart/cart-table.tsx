"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Open catalogue</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-10">
          <div className="overflow-x-auto lg:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((i) => (
                  <TableRow key={i.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${i.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={i.image}
                          alt={i.name}
                          width={80}
                          height={80}
                        />
                        <span className="px-2">{i.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="ghost"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(i.productId);

                            if (!res.success) {
                              toast.error(res.message);
                              return;
                            }
                            toast.success(res.message);
                          })
                        }
                      >
                        <MinusIcon />
                      </Button>
                      <p
                        className={` font-light ${
                          isPending ? "animate-pulse" : ""
                        }`}
                      >
                        {i.qty}
                      </p>
                      <Button
                        disabled={isPending}
                        variant="ghost"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(i);

                            if (!res.success) {
                              toast.error(res.message);
                              return;
                            }
                            toast.success(res.message);
                          })
                        }
                      >
                        <PlusIcon />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">${i.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="gap-4 lg:min-h-70 flex flex-col justify-center">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                <br />
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className={` w-full cursor-pointer ${isPending ? "animate-pulse" : ""}`}
                disabled={isPending}
                onClick={() => {
                  startTransition(() => {
                    router.push("/shipping-address");
                  });
                }}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CartTable;
