import { ArrowRight, RefreshCw, Shield, Star, Truck } from "lucide-react";

import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";

function HomePage() {
  // Sample data - replace with your actual data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "Minimalist Desk Lamp",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      badge: "Popular",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      count: "150+ items",
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=200&fit=crop",
      count: "200+ items",
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      count: "300+ items",
    },
    {
      name: "Sports & Fitness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      count: "120+ items",
    },
  ];

  return (
    <main>
      {/* Hero Section - Clean and minimal */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-foreground">
                Simply
                <span className="block font-bold text-primary">Beautiful</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Discover thoughtfully designed products that enhance your everyday life
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" size="lg">
                Browse Categories
              </Button>
            </div>

            {/* Trust indicators - minimalist */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-16 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Clean grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-foreground">Featured Products</h2>
            <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
              Handpicked favorites loved by our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer">
                {/* Product Image */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 text-xs bg-white/90 text-gray-900 border-0 rounded-md px-2 py-1">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 text-foreground">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-500">
                      {[...Array.from({ length: 5 })].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-current"
                              : "text-muted-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      (
                      {product.reviews}
                      )
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      $
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        $
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Minimalist approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
              Explore our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories
              && categories.map((category, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted/20 mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
