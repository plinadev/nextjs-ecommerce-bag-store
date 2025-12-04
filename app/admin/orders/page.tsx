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
  searchParams: Promise<{ page: string; query: string }>;
}) {
  await requireAdmin();
  const { page = "1", query: searchText } = await props.searchParams;
  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  });
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {searchText && (
          <div>
            Filtered by <i>&quot;{searchText}&quot;</i>
            <Link href="/admin/orders">
              <Button variant="outline" className="text-xs ml-4 p-2">
                Remove filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="oberflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Date </TableHead>
              <TableHead>Buyer </TableHead>
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
                <TableCell>{order.user.name}</TableCell>
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
