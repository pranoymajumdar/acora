import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { LucideChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const DesktopNavigation = () => {
  const categories = [
    {
      name: "New Arrivals",
      featured: ["Summer Collection", "Exclusive Items", "Limited Edition"],
    },
    { name: "Clothing", featured: ["T-Shirts", "Jeans", "Dresses", "Jackets"] },
    {
      name: "Footwear",
      featured: ["Sneakers", "Boots", "Sandals", "Formal Shoes"],
    },
    {
      name: "Electronics",
      featured: ["Smartphones", "Headphones", "Speakers", "Accessories"],
    },
    { name: "Home", featured: ["Decor", "Kitchen", "Furniture", "Lighting"] },
  ];
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category.name}>
            <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4">
                <div className="grid grid-cols-2 gap-3">
                  {category.featured.map((item) => (
                    <NavigationMenuLink
                      key={item}
                      href="#"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-muted border-transparent border hover:border-border"
                    >
                      <div className="font-medium">{item}</div>
                      <div className="text-sm text-muted-foreground">
                        Discover our {item.toLowerCase()} collection
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
                
                {/* View All Category Link - Added to match mobile navigation */}
                <Link
                  href="#"
                  className="flex flex-row justify-between items-center bg-secondary border border-transparent hover:border-border mt-3 py-3 px-2 rounded-md text-sm"
                >
                  <span>View all {category.name}</span>
                  <LucideChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;