import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};
async function CartPage() {
  const cart = await getMyCart();
  return (
    <div>
      <CartTable cart={cart} />
    </div>
  );
}

export default CartPage;
