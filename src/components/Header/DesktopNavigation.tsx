

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const shop = [
  {
    id: "1",
    name: "Mobiles & Accessories",
    slug: "mobiles-accessories",
    collection: [
      {
        id: "col:1",
        name: "Mobiles",
        slug: "mobiles",
      },
      {
        id: "col:1-2",
        name: "Cases & Covers",
        slug: "cases-covers",
      },
      {
        id: "col:1-3",
        name: "Power Banks",
        slug: "power-banks",
      },
      {
        id: "col:1-4",
        name: "Chargers & Cables",
        slug: "chargers-cables",
      }
    ]
  },
  {
    id: "2",
    name: "Laptops & Computers",
    slug: "laptops-computers",
    collection: [
      {
        id: "col:2",
        name: "Laptops",
        slug: "laptops",
      },
      {
        id: "col:2-2",
        name: "Desktop PCs",
        slug: "desktop-pcs",
      },
      {
        id: "col:2-3",
        name: "Computer Parts",
        slug: "computer-parts",
      },
      {
        id: "col:2-4",
        name: "Accessories",
        slug: "computer-accessories",
      }
    ]
  },
  {
    id: "3",
    name: "Electronics",
    slug: "electronics",
    collection: [
      {
        id: "col:3",
        name: "TV & Audio",
        slug: "tv-audio",
      },
      {
        id: "col:3-2",
        name: "Cameras",
        slug: "cameras",
      },
      {
        id: "col:3-3",
        name: "Gaming",
        slug: "gaming",
      },
      {
        id: "col:3-4",
        name: "Smart Home",
        slug: "smart-home",
      }
    ]
  },
  {
    id: "4",
    name: "Fashion",
    slug: "fashion",
    collection: [
      {
        id: "col:4",
        name: "Clothing",
        slug: "clothing",
      },
      {
        id: "col:4-2",
        name: "Shoes",
        slug: "shoes",
      },
      {
        id: "col:4-3",
        name: "Accessories",
        slug: "fashion-accessories",
      },
      {
        id: "col:4-4",
        name: "Watches",
        slug: "watches",
      }
    ]
  }
]

export function DesktopNavigation() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {shop?.length && shop.map(shop => (
                <ListItem
                  key={shop.id}
                  title={shop.name}
                  href={`/shop?shopSlug=${shop.slug}&?collectionSlug=${shop.collection[0].slug}`}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, amet?
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
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
