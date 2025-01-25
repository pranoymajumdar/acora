import { Badge } from "@/components/ui/badge";
import { BorderTrail } from "@/components/ui/border-trail";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-muted dark:bg-muted/10 top-5 rounded-xl hidden sm:block" />

      <div className="container relative mx-auto px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 md:grid-cols-2 md:items-center">
          {/* Left content column */}
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4">
              New Collection 2025
            </Badge>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              <SparklesText text="Elevate Your Style" />
              <span className="block mt-2 text-muted-foreground">
                With Confidence
              </span>
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
              Discover our curated collection of premium fashion accessories,
              designed to make a lasting impression. Handcrafted with precision
              and style in mind.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                icon={LucideArrowRight}
                effect="shine"
                iconPlacement="right"
                className="w-full sm:w-auto"
              >
                Shop Now
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                View Lookbook
              </Button>
            </div>
            {/* Social proof */}
            <div className="pt-6 border-t">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold">50k+</p>
                  <p className="text-sm text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.9/5</p>
                  <p className="text-sm text-muted-foreground">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image column */}
          <div className="relative">
            <div className="relative rounded-lg border bg-card p-2">
              <BorderTrail
                style={{
                  boxShadow:
                    "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                }}
                size={100}
              />
              <Image
                width={100}
                height={100}
                src="/placeholder.svg"
                alt="Premium Fashion Accessories"
                className="w-full h-auto rounded-md object-cover"
              />
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-card p-4 shadow-sm border">
                <p className="font-medium">Limited Edition</p>
                <p className="text-sm text-muted-foreground">
                  Exclusive Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
