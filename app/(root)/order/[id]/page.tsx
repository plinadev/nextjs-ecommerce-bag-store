import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Order Details",
};
async function OrderPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  const order = await getOrderById(id);

  const session = await auth();

  if (!order) notFound();

  return (
    <div>
      <OrderDetailsTable
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user.role === "admin" || false}
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
      />
    </div>
  );
}

export default OrderPage;
