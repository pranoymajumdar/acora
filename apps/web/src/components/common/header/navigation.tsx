import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
];

export const HeaderNavigation = () => {
  return (
    <nav className="hidden items-center gap-4 md:flex">
      {links.map((link) => (
        <Link
          to={link.href}
          key={link.href}
          className="text-sm hover:text-muted-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
