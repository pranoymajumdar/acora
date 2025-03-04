"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  ShoppingCart,
  User,
  Menu,
  Search,
  Heart,
  Bell,
  X,
} from "lucide-react";

const EcommerceNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);

  const searchResults = [
    { id: 1, name: "Premium White Sneakers", category: "Shoes" },
    { id: 2, name: "Wireless Bluetooth Headphones", category: "Electronics" },
    { id: 3, name: "Organic Cotton T-Shirt", category: "Clothing" },
    { id: 4, name: "Stainless Steel Water Bottle", category: "Accessories" },
    { id: 5, name: "Wireless Charging Pad", category: "Electronics" },
  ].filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="flex flex-col w-full">
      {/* Top utility bar */}
      <div className="bg-black text-white py-2 px-4 text-sm flex justify-between items-center">
        <div className="hidden md:block">Free shipping on orders over $50</div>
        <div className="flex gap-4 text-xs">
          <a href="#" className="hover:underline">
            Track Order
          </a>
          <a href="#" className="hover:underline">
            Help & FAQs
          </a>
          <a href="#" className="hover:underline">
            Store Locator
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col gap-6 py-4">
                  <div className="font-bold text-xl">Shop Categories</div>
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <div className="font-semibold">{category.name}</div>
                      <div className="pl-4 space-y-2">
                        {category.featured.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block hover:text-blue-600"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <User size={16} /> My Account
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Heart size={16} /> Wishlist
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Bell size={16} /> Notifications
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="text-xl font-bold">BRANDNAME</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {categories.map((category) => (
                    <NavigationMenuItem key={category.name}>
                      <NavigationMenuTrigger>
                        {category.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-2 gap-3 p-4 w-96">
                          {category.featured.map((item) => (
                            <NavigationMenuLink
                              key={item}
                              href="#"
                              className="block select-none space-y-1 rounded-md p-3 hover:bg-slate-100"
                            >
                              <div className="font-medium">{item}</div>
                              <div className="text-sm text-slate-500">
                                Discover our {item.toLowerCase()} collection
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Sale
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Search and actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Search className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <Command>
                      <CommandInput
                        placeholder="Search products..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Products">
                          {searchResults.map((result) => (
                            <CommandItem
                              key={result.id}
                              onSelect={() => {
                                console.log(`Selected: ${result.name}`);
                                setIsSearchOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span>{result.name}</span>
                                <span className="text-xs text-slate-500">
                                  {result.category}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Announcement bar - removable */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <div className="flex justify-center items-center gap-2">
          <span>
            Spring sale now on! Use code SPRING25 for 25% off all items
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white p-0 h-auto hover:bg-transparent"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceNavigation;
