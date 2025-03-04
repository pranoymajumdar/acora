'use client';
import React, { useState } from "react";
import { Heart, X, ShoppingCart, Trash2, Share2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useToast } from "@/hooks/use-toast";

// Sample product data
const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    inStock: true,
    discount: 15,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    category: "Accessories",
    inStock: true,
    discount: 0,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D",
    category: "Clothing",
    inStock: false,
    discount: 0,
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
    category: "Electronics",
    inStock: true,
    discount: 20,
  },
];

const Wishlist  = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
//   const { toast } = useToast();
  
  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    // toast({
    //   title: "Item removed",
    //   description: "Item has been removed from your wishlist",
    // });
  };
  
  const addToCart = (item: typeof wishlistItems[0]) => {
    // In a real app, this would add to cart state/API
    // toast({
    //   title: "Added to cart",
    //   description: `${item.name} has been added to your cart`,
    // });
  };
  
  const shareItem = (item: typeof wishlistItems[0]) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(`Check out this amazing product: ${item.name}`);
    // toast({
    //   title: "Link copied",
    //   description: "Product link copied to clipboard",
    // });
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    // toast({
    //   title: "Wishlist cleared",
    //   description: "All items have been removed from your wishlist",
    // });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg">
        <SheetHeader className="pr-6">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            My Wishlist ({wishlistItems.length})
          </SheetTitle>
          <SheetDescription>
            Items you've saved for later. Add them to cart or share with friends.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </div>
          {wishlistItems.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={clearWishlist}
            >
              Clear all
            </Button>
          )}
        </div>
        
        <Separator className="my-4" />
        
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mb-4 stroke-[1.25px]" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-[250px]">
              Items added to your wishlist will appear here
            </p>
            <SheetClose asChild>
              <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-220px)] pr-4">
            <div className="space-y-4 mt-2">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                    {item.discount > 0 && (
                      <Badge className="absolute top-1 left-1 bg-destructive">
                        -{item.discount}%
                      </Badge>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-background/90 rounded">
                          Out of stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-auto pt-2 flex justify-between items-center">
                      <div className="flex items-baseline gap-1">
                        {item.discount > 0 ? (
                          <>
                            <span className="font-medium">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => shareItem(item)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          disabled={!item.inStock}
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        
        {wishlistItems.length > 0 && (
          <>
            <Separator className="my-4" />
            <SheetFooter className="flex-col sm:flex-row gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </SheetClose>
              <Button 
                className="w-full sm:w-auto"
                onClick={() => {
                  wishlistItems.forEach(item => {
                    if (item.inStock) addToCart(item);
                  });
                }}
              >
                Add All to Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
export default Wishlist;