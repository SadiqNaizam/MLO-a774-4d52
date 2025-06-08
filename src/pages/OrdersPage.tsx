import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis
} from '@/components/ui/pagination';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Search, MoreHorizontal, PlusCircle, FileText } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const orderFormSchema = z.object({
  status: z.string().min(1, "Status is required"),
  trackingNumber: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const sampleOrders = [
  { id: 'ORD001', customer: 'Alice Wonderland', email: 'alice@example.com', date: '2023-10-26', status: 'Delivered', total: '$150.00', paymentMethod: 'Credit Card' },
  { id: 'ORD002', customer: 'Bob The Builder', email: 'bob@example.com', date: '2023-10-25', status: 'Processing', total: '$75.50', paymentMethod: 'PayPal' },
  { id: 'ORD003', customer: 'Charlie Brown', email: 'charlie@example.com', date: '2023-10-24', status: 'Cancelled', total: '$200.00', paymentMethod: 'Stripe' },
  { id: 'ORD004', customer: 'Diana Prince', email: 'diana@example.com', date: '2023-10-23', status: 'Shipped', total: '$99.90', paymentMethod: 'Stripe' },
  { id: 'ORD005', customer: 'Edward Scissorhands', email: 'edward@example.com', date: '2023-10-22', status: 'Pending', total: '$42.00', paymentMethod: 'Bank Transfer' },
];

const OrdersPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
  });

  const handleViewDetails = (order: typeof sampleOrders[0]) => {
    setSelectedOrder(order);
    form.reset({ status: order.status, trackingNumber: '' });
    setIsDetailDialogOpen(true);
  };

  function onSubmit(data: OrderFormValues) {
    console.log("Order update data:", data);
    // Logic to update order would go here
    setIsDetailDialogOpen(false);
  }
  
  console.log('OrdersPage loaded');

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
              <BreadcrumbItem><BreadcrumbPage>Orders</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Manage Orders</h1>
            <Button size="sm" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search orders by ID, customer..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button>Apply Filters</Button>
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'Delivered' ? 'default' : // 'success' if you have it
                        order.status === 'Processing' ? 'secondary' : // 'warning'
                        order.status === 'Shipped' ? 'outline' : // 'info'
                        order.status === 'Cancelled' ? 'destructive' :
                        'secondary' // for 'Pending'
                      }>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>

          {selectedOrder && (
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <DialogDescription>
                    Customer: {selectedOrder.customer} ({selectedOrder.email}) <br/>
                    Total: {selectedOrder.total} | Payment: {selectedOrder.paymentMethod}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Processing">Processing</SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="trackingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tracking number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;