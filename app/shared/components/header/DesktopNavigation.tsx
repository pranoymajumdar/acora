
import { NavLink } from "react-router";
import type { CollectionHierarchy } from "~/features/collections/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/shared/components/ui/navigation-menu";


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Clothing",
    href: "/categories/clothing",
    description:
      "Discover our latest fashion collection including tops, bottoms, dresses, and outerwear.",
  },
  {
    title: "Electronics",
    href: "/categories/electronics",
    description:
      "Browse our selection of smartphones, laptops, tablets, and accessories.",
  },
  {
    title: "Home & Living",
    href: "/categories/home-living",
    description:
      "Find furniture, decor, kitchenware, and everything you need for your home.",
  },
  {
    title: "Beauty",
    href: "/categories/beauty",
    description: "Explore skincare, makeup, fragrances, and personal care products.",
  },
  {
    title: "Sports & Fitness",
    href: "/categories/sports",
    description:
      "Get equipped with sportswear, exercise equipment, and outdoor gear.",
  },
  {
    title: "Books & Media",
    href: "/categories/books",
    description:
      "Browse through books, magazines, music, movies, and digital content.",
  },
]

export function DesktopNavigation({ collections }: { collections: CollectionHierarchy[] }) {
  return (

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink to='/'>Home</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <NavLink to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  )
}
