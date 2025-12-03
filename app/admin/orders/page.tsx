import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Orders Panel",
};
async function AdminOrdersPage(props: {
  searchParams: Promise<{ page: string }>;
}) {
  await requireAdmin();
  const { page = "1" } = await props.searchParams;
  const orders = await getAllOrders({
    page: Number(page),
  });
  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders </h2>
      <div className="oberflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Date </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <Badge variant="secondary">
                      Paid at {formatDateTime(order.paidAt!).dateTime}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Awaiting payment</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    <Badge variant="secondary">
                      Delivered at {formatDateTime(order.deliveredAt!).dateTime}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Awaiting delivery</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Details
                    </Button>
                  </Link>
                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
