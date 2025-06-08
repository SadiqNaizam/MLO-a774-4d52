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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis
} from '@/components/ui/pagination';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Search, MoreHorizontal, PlusCircle, ListFilter } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  category: z.string().min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const sampleProducts = [
  { id: 'PROD001', name: 'Plush Toy Dragon', sku: 'PTD-001', price: 29.99, stock: 150, status: 'In Stock', category: 'Toys', imageUrl: 'https://source.unsplash.com/random/40x40?sig=1&toy,dragon', isActive: true, description: 'A very cuddly dragon.' },
  { id: 'PROD002', name: 'Wooden Blocks Set', sku: 'WBS-002', price: 45.00, stock: 0, status: 'Out of Stock', category: 'Educational', imageUrl: 'https://source.unsplash.com/random/40x40?sig=2&toy,blocks', isActive: false, description: 'Colorful wooden blocks.' },
  { id: 'PROD003', name: 'RC Car Racer', sku: 'RCR-003', price: 79.50, stock: 75, status: 'In Stock', category: 'Vehicles', imageUrl: 'https://source.unsplash.com/random/40x40?sig=3&toy,car', isActive: true, description: 'Fast remote controlled car.' },
];

const ProductsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormValues & { id?: string } | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: '', price: 0, stock: 0, description: '', isActive: true, category: '' }
  });

  const handleAddProduct = () => {
    setEditingProduct(null); // Or set default values for a new product
    form.reset({ name: '', price: 0, stock: 0, description: '', isActive: true, category: '' });
    setIsProductDialogOpen(true);
  };
  
  const handleEditProduct = (product: typeof sampleProducts[0]) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      isActive: product.isActive,
      category: product.category,
    });
    setIsProductDialogOpen(true);
  };

  function onSubmit(data: ProductFormValues) {
    console.log("Product form data:", data);
    // Logic to add/update product
    setIsProductDialogOpen(false);
  }
  
  console.log('ProductsPage loaded');

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
              <BreadcrumbItem><BreadcrumbPage>Products</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Manage Products</h1>
            <div className="flex items-center gap-2">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Out of Stock</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" onClick={handleAddProduct}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>

          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products by name, SKU..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={product.imageUrl} alt={product.name} />
                        <AvatarFallback>{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'In Stock' ? 'default' : 'destructive'}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator/>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>

          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct?.id ? `Update details for ${editingProduct.name}.` : 'Fill in the details for the new product.'}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl><Input placeholder="e.g. Awesome T-Shirt" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="0.00" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="stock" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Toys">Toys</SelectItem>
                          <SelectItem value="Educational">Educational</SelectItem>
                          <SelectItem value="Vehicles">Vehicles</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="Briefly describe the product..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="isActive" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>Make this product visible and purchasable.</FormDescription>
                      </div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingProduct?.id ? 'Save Changes' : 'Create Product'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;