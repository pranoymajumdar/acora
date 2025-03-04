'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, X, Check } from "lucide-react";

const CartSheet = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Black",
      size: "One Size",
    },
    {
      id: 2,
      name: "Classic Cotton T-Shirt",
      price: 24.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      color: "White",
      size: "M",
    },
    {
      id: 3,
      name: "Running Sneakers",
      price: 89.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Blue/Gray",
      size: "42",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = 4.99;
  const total = subtotal - discount + shipping;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-medium">Your Cart</SheetTitle>
            <Badge variant="outline" className="ml-2">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </div>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <div className="flex-grow overflow-auto px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border rounded-lg">
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <div className="flex-shrink-0 rounded-md overflow-hidden mr-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.color}, {item.size}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow"
                    disabled={promoApplied}
                  />
                  <Button
                    variant={promoApplied ? "outline" : "default"}
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className="whitespace-nowrap"
                  >
                    {promoApplied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Applied
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-muted-foreground mt-1">
                    10% discount applied!
                  </p>
                )}
              </div>
            </div>

            <SheetFooter className="px-6 py-4 border-t sticky bottom-0 bg-background z-10">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-destructive">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-grow py-10 px-6 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Your cart is empty</h3>
            <p className="text-muted-foreground mt-1 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetClose asChild>
              <Button>Start Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;