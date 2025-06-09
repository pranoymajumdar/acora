import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

export const DesktopNavigation = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary"
          )}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};
