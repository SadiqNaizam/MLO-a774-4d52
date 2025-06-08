import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis
} from '@/components/ui/pagination';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Search, MoreHorizontal, UserPlus } from 'lucide-react';

const sampleCustomers = [
  { id: 'CUST001', name: 'Peter Pan', email: 'peter@neverland.com', joined: '2023-01-15', totalOrders: 5, totalSpent: '$500.00', avatarUrl: 'https://i.pravatar.cc/40?u=peter' },
  { id: 'CUST002', name: 'Wendy Darling', email: 'wendy@darling.com', joined: '2023-02-20', totalOrders: 3, totalSpent: '$250.75', avatarUrl: 'https://i.pravatar.cc/40?u=wendy' },
  { id: 'CUST003', name: 'Captain Hook', email: 'hook@jollyroger.com', joined: '2023-03-10', totalOrders: 1, totalSpent: '$99.99', avatarUrl: 'https://i.pravatar.cc/40?u=hook' },
  { id: 'CUST004', name: 'Tinker Bell', email: 'tink@pixiehollow.com', joined: '2023-04-05', totalOrders: 12, totalSpent: '$1203.50', avatarUrl: 'https://i.pravatar.cc/40?u=tinkerbell' },
];

const CustomersPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof sampleCustomers[0] | null>(null);
  
  const handleViewProfile = (customer: typeof sampleCustomers[0]) => {
    setSelectedCustomer(customer);
    setIsProfileDialogOpen(true);
  };

  console.log('CustomersPage loaded');

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
              <BreadcrumbItem><BreadcrumbPage>Customers</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Manage Customers</h1>
            <Button size="sm" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>

          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers by name, email..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Total Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.joined}</TableCell>
                    <TableCell className="text-right">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">{customer.totalSpent}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewProfile(customer)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
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
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>

          {selectedCustomer && (
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Customer Profile: {selectedCustomer.name}</DialogTitle>
                  <DialogDescription>
                    Details for {selectedCustomer.name} ({selectedCustomer.email}).
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <p><strong>Joined:</strong> {selectedCustomer.joined}</p>
                  <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                  <p><strong>Total Spent:</strong> {selectedCustomer.totalSpent}</p>
                  {/* More customer details could be added here */}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;