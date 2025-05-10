import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
];

export const HeaderNavigation = () => {
  return (
    <nav className="hidden md:flex gap-4 items-center">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="text-sm hover:text-muted-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
