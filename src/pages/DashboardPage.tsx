import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MetricDisplayCard from '@/components/MetricDisplayCard';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import ActivityFeedItem from '@/components/ActivityFeedItem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { DollarSign, Users, CreditCard, Activity as ActivityIcon, ShoppingBag, BarChart3 } from 'lucide-react';

const sampleSalesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];
const salesSeries = [
  { dataKey: 'sales', name: 'Sales Volume', stroke: 'hsl(var(--primary))', fill: 'hsl(var(--primary))' },
  { dataKey: 'revenue', name: 'Revenue', stroke: 'hsl(var(--secondary))', fill: 'hsl(var(--secondary))' },
];

const sampleActivities = [
  { id: 1, actor: { name: 'Olivia Martin', avatarUrl: 'https://i.pravatar.cc/40?u=olivia' }, action: 'placed a new order', target: { name: '#ORD0015', href: '/orders/ORD0015' }, timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 2, actor: { name: 'Jackson Lee', avatarUrl: 'https://i.pravatar.cc/40?u=jackson' }, action: 'updated product stock', target: { name: 'Plush Toy Dragon', href: '/products/PROD001' }, timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 3, actor: { name: 'System Update' }, action: 'processed 50 pending payments', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), icon: <CreditCard className="h-4 w-4" /> },
];

const DashboardPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log('DashboardPage loaded');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar className="hidden md:block" />
      
      <div className="flex flex-col">
        <Header
          userName="Admin Dashboard"
          userAvatarUrl="https://i.pravatar.cc/40?u=admin"
          onDrawerToggle={() => setIsMobileMenuOpen(true)}
        />
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-[220px] sm:w-[280px]">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricDisplayCard title="Total Revenue" value="$45,231.89" description="+20.1% from last month" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} change="+20.1%" changeType="positive" />
            <MetricDisplayCard title="New Customers" value="+2350" description="+180.1% from last month" icon={<Users className="h-4 w-4 text-muted-foreground" />} change="+180.1%" changeType="positive" />
            <MetricDisplayCard title="Total Orders" value="12,234" description="+19% from last month" icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />} change="+19%" changeType="positive" />
            <MetricDisplayCard title="Conversion Rate" value="5.2%" description="-1.2% from last month" icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} change="-1.2%" changeType="negative" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Track sales and revenue trends over time.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InteractiveDataChart 
                  data={sampleSalesData} 
                  series={salesSeries} 
                  xAxisDataKey="name" 
                  chartType="line"
                  aspectRatio={16/7}
                  yAxisLabel="Amount (USD)"
                  xAxisLabel="Month"
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions across the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {sampleActivities.map(activity => (
                      <ActivityFeedItem 
                        key={activity.id}
                        actor={activity.actor}
                        action={activity.action}
                        target={activity.target}
                        timestamp={activity.timestamp}
                        icon={activity.icon || <ActivityIcon className="h-4 w-4" />}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;