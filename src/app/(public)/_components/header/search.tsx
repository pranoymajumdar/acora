'use client';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LucideSearch } from 'lucide-react';
import React, { useState } from 'react'

const Search = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
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
  return (
    <div className="relative">
    <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideSearch className="h-5 w-5" />
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
  )
}

export default Search