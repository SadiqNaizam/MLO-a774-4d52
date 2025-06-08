import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package2, Home, ShoppingCart, Users, LineChart, Settings } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

// Example navigation items - customize as needed
const defaultNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package2 },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/settings', label: 'Settings', icon: Settings, disabled: true },
];

interface SidebarProps {
  navItems?: NavItem[];
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems = defaultNavItems, className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar, current path:", location.pathname);

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="">Admin Panel</span>
          </Link>
          {/* Optional: Notification bell or other icons for collapsed sidebar state */}
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                  location.pathname === item.href && "bg-muted text-primary",
                  item.disabled && "pointer-events-none opacity-50"
                )}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : undefined}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {/* Optional: Badges for notifications, etc. */}
                {/* {item.label === 'Orders' && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                )} */}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          {/* Optional: Sidebar footer content, e.g., user profile quick link or settings */}
          <Button size="sm" variant="outline" className="w-full">
            Help & Support
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;