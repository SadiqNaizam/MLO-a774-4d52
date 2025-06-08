import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Download } from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', sales: 12000, profit: 4500, orders: 150 },
  { month: 'Feb', sales: 15000, profit: 5500, orders: 180 },
  { month: 'Mar', sales: 18000, profit: 6500, orders: 210 },
  { month: 'Apr', sales: 16000, profit: 6000, orders: 190 },
  { month: 'May', sales: 20000, profit: 7500, orders: 240 },
  { month: 'Jun', sales: 22000, profit: 8000, orders: 260 },
];
const salesChartSeries = [
  { dataKey: 'sales', name: 'Total Sales', stroke: 'hsl(var(--primary))', fill: 'hsla(var(--primary), 0.2)'},
  { dataKey: 'profit', name: 'Net Profit', stroke: 'hsl(var(--chart-2))', fill: 'hsla(var(--chart-2), 0.2)'},
];

const topProductsData = [
  { product: 'Plush Toy Dragon', unitsSold: 520, revenue: 15548.80 },
  { product: 'RC Car Racer', unitsSold: 350, revenue: 27825.00 },
  { product: 'Wooden Blocks Set', unitsSold: 280, revenue: 12600.00 },
  { product: 'Learning Tablet', unitsSold: 210, revenue: 20979.00 },
];

const AnalyticsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log('AnalyticsPage loaded');

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Analytics</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Business Analytics</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Data
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="overview">Sales Overview</TabsTrigger>
              <TabsTrigger value="products">Product Performance</TabsTrigger>
              <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Sales, profit, and order trends over the selected period.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <InteractiveDataChart
                    data={monthlySalesData}
                    series={salesChartSeries}
                    xAxisDataKey="month"
                    chartType="area"
                    aspectRatio={16/6}
                    yAxisLabel="Amount (USD)"
                    xAxisLabel="Month"
                    showGrid
                    yAxisFormatter={(value) => `$${Number(value).toLocaleString()}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Based on units sold and revenue generated.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="text-right">Units Sold</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProductsData.map((product) => (
                        <TableRow key={product.product}>
                          <TableCell className="font-medium">{product.product}</TableCell>
                          <TableCell className="text-right">{product.unitsSold}</TableCell>
                          <TableCell className="text-right">${product.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="customers">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>New vs. Returning customers. (Placeholder chart)</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                     <InteractiveDataChart
                        data={[
                            { name: 'Jan', new: 100, returning: 50 }, { name: 'Feb', new: 120, returning: 70 },
                            { name: 'Mar', new: 150, returning: 90 }, { name: 'Apr', new: 130, returning: 80 }
                        ]}
                        series={[
                            { dataKey: 'new', name: 'New Customers', stroke: 'hsl(var(--primary))', fill: 'hsla(var(--primary), 0.3)' },
                            { dataKey: 'returning', name: 'Returning Customers', stroke: 'hsl(var(--chart-3))', fill: 'hsla(var(--chart-3), 0.3)' }
                        ]}
                        xAxisDataKey="name"
                        chartType="bar"
                        aspectRatio={16/6}
                        yAxisLabel="Number of Customers"
                        showGrid
                      />
                  </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;