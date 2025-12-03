import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderSummary } from "@/lib/actions/order.actions";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import {
  BadgeDollarSignIcon,
  BarcodeIcon,
  CreditCardIcon,
  UsersIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Charts from "./charts";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};
async function AdminOverviewPage() {
  await requireAdmin();

  const summary = await getOrderSummary();
  return (
    <div className="space-y-2 ">
      <h1 className="h2-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BadgeDollarSignIcon />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatCurrency(
              summary.totalSales._sum.totalPrice?.toString() || 0
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCardIcon />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatNumber(summary.orderCount)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UsersIcon />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatNumber(summary.userCount)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <BarcodeIcon />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatNumber(summary.productCount)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts
              data={{
                salesData: summary.salesData,
              }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSales.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.user.name ? order.user.name : "Deleted User"}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>
                      <Link href={`/order/${order.id}`}>
                        <Button variant="link" className="cursor-pointer">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminOverviewPage;
