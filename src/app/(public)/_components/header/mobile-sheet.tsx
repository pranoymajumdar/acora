import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Menu, ChevronRight } from "lucide-react";
import React from "react";

const MobileSheet = () => {
  const categories = [
    {
      name: "New Arrivals",
      featured: ["Summer Collection", "Exclusive Items", "Limited Edition"],
      badge: "New",
    },
    { 
      name: "Clothing", 
      featured: ["T-Shirts", "Jeans", "Dresses", "Jackets"],
    },
    {
      name: "Footwear",
      featured: ["Sneakers", "Boots", "Sandals", "Formal Shoes"],
    },
    {
      name: "Electronics",
      featured: ["Smartphones", "Headphones", "Speakers", "Accessories"],
      badge: "Sale",
    },
    { 
      name: "Home", 
      featured: ["Decor", "Kitchen", "Furniture", "Lighting"],
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-sm p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="text-xl font-medium">Shop Categories</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category.name} value={category.name} className="border-b">
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center gap-2">
                    {category.name}
                    {category.badge && (
                      <Badge variant={category.badge === "Sale" ? "destructive" : "default"} className="ml-2">
                        {category.badge}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-3">
                    {category.featured.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center justify-between py-2 text-sm hover:text-primary transition-colors"
                      >
                        {item}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                    <a
                      href="#"
                      className="flex items-center justify-between pt-3 mt-2 text-sm font-medium text-primary border-t"
                    >
                      View all {category.name}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;