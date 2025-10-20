import * as React from 'react';
import { ShoppingCart, DollarSign, Users, Clock } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/types';

const dashboardStats: DashboardStats = {
  totalOrders: 245,
  totalRevenue: 124500,
  activeCustomers: 89,
  pendingOrders: 12,
};

const recentActivities = [
  { id: 1, action: 'New order received', time: '2 minutes ago', type: 'order' },
  { id: 2, action: 'Payment confirmed', time: '15 minutes ago', type: 'payment' },
  { id: 3, action: 'Order shipped', time: '1 hour ago', type: 'shipping' },
  { id: 4, action: 'Customer registered', time: '3 hours ago', type: 'customer' },
  { id: 5, action: 'Order completed', time: '5 hours ago', type: 'order' },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your customer portal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          description="All time orders"
          icon={ShoppingCart}
          trend={{ value: 12.5, isPositive: true }}
        />
        <DashboardCard
          title="Total Revenue"
          value={`€${dashboardStats.totalRevenue.toLocaleString()}`}
          description="Total earnings"
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <DashboardCard
          title="Active Customers"
          value={dashboardStats.activeCustomers}
          description="Currently active"
          icon={Users}
          trend={{ value: 4.1, isPositive: true }}
        />
        <DashboardCard
          title="Pending Orders"
          value={dashboardStats.pendingOrders}
          description="Awaiting processing"
          icon={Clock}
          trend={{ value: -2.3, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activity.type === 'order'
                        ? 'bg-blue-100 text-blue-800'
                        : activity.type === 'payment'
                        ? 'bg-green-100 text-green-800'
                        : activity.type === 'shipping'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              tabIndex={0}
              aria-label="Create new order"
            >
              Create New Order
            </button>
            <button
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              tabIndex={0}
              aria-label="View all orders"
            >
              View All Orders
            </button>
            <button
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              tabIndex={0}
              aria-label="Generate report"
            >
              Generate Report
            </button>
            <button
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              tabIndex={0}
              aria-label="Contact support"
            >
              Contact Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}