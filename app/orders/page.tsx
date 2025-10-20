import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import type { Order } from '@/types';

const orders: Order[] = [
  { id: 'ORD-001', date: '2025-10-20', customer: 'John Doe', product: 'Premium Subscription', amount: 99.99, status: 'completed' },
  { id: 'ORD-002', date: '2025-10-19', customer: 'Jane Smith', product: 'Enterprise Plan', amount: 499.99, status: 'processing' },
  { id: 'ORD-003', date: '2025-10-19', customer: 'Bob Johnson', product: 'Basic Plan', amount: 29.99, status: 'completed' },
  { id: 'ORD-004', date: '2025-10-18', customer: 'Alice Brown', product: 'Professional Plan', amount: 199.99, status: 'pending' },
  { id: 'ORD-005', date: '2025-10-18', customer: 'Charlie Wilson', product: 'Premium Subscription', amount: 99.99, status: 'completed' },
  { id: 'ORD-006', date: '2025-10-17', customer: 'Eva Martinez', product: 'Enterprise Plan', amount: 499.99, status: 'cancelled' },
  { id: 'ORD-007', date: '2025-10-17', customer: 'David Lee', product: 'Basic Plan', amount: 29.99, status: 'processing' },
  { id: 'ORD-008', date: '2025-10-16', customer: 'Sophie Taylor', product: 'Professional Plan', amount: 199.99, status: 'completed' },
];

const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage and track all your customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" aria-label="Filter orders" tabIndex={0}>
            <Filter className="mr-2 h-4 w-4" />Filter
          </Button>
          <Button aria-label="Export orders" tabIndex={0}>
            <Download className="mr-2 h-4 w-4" />Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>A complete list of all orders placed in your portal</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>€{order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" aria-label={`View details for order ${order.id}`} tabIndex={0}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}