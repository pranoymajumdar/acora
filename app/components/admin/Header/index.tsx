import { LucideLayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button, buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export default function Header() {
  const navLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LucideLayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: LucideLayoutDashboard },
    { name: 'Customers', href: '/admin/customers', icon: LucideLayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: LucideLayoutDashboard },
    { name: 'Settings', href: '/admin/settings', icon: LucideLayoutDashboard }
  ];
  return (
    <header className="sticky top-0 z-50 h-16 border-b backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-start gap-5">
          <NavLink to="/admin/dashboard" className="text-3xl font-thin">
            Acora
          </NavLink>
          <nav className="hidden items-center justify-center gap-3 md:flex">
            {navLinks.map(({ name, href, icon }) => (
              <NavLink
                to={href}
                key={href}
                className={({ isActive, isPending }) =>
                  cn('text-sm font-medium text-muted-foreground hover:text-foreground', {
                    'text-foreground': isActive
                  })
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end">
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
