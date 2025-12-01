"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const response = await addItemToCart(item);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      //handle success add to cart
      toast.success(response.message, {
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  //check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const response = await removeItemFromCart(item.productId);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    });
  };
  return existItem ? (
    <div className="flex w-1/2 lg:w-full justify-between items-center justify-self-center">
      <Button
        type="button"
        variant="ghost"
        onClick={handleRemoveFromCart}
        disabled={isPending}
      >
        <MinusIcon />
      </Button>
      <p className={`text-lg font-light ${isPending ? "animate-pulse" : ""}`}>
        {existItem.qty}
      </p>
      <Button
        type="button"
        variant="ghost"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        <PlusIcon />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? "Adding to cart..." : "Add To Cart"}
    </Button>
  );
}

export default AddToCart;
