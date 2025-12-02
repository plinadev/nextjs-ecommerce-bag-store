import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";

function OrderDetailsTable({ order }: { order: Order }) {
  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    deliveredAt,
    id,
    isDelivered,
    isPaid,
    createdAt,
    paidAt,
    user,
  } = order;
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent>
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="outline">Awaiting payment</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.streetAddress}, {shippingAddress.city}
              </p>
              <p className="mb-2">
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="outline">Awaiting delivery</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <span>{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span>${item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="gap-4 space-y-4 ">
            <div className="flex justify-between">
              <div className="font-semibold">Items</div>
              <div>{formatCurrency(itemsPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Tax</div>
              <div>{formatCurrency(taxPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Shipping</div>
              <div>{formatCurrency(shippingPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Total</div>
              <div>{formatCurrency(totalPrice)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrderDetailsTable;
