"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const goldBarImageSrc =
  "https://silvergold.lovable.app/assets/gold-bar-D2ySwO4d.jpg";
const silverBarImageSrc =
  "https://silvergold.lovable.app/assets/silver-bar-BlTK1x4I.jpg";

interface Product {
  id: string;
  metal: string;
  name: string;
  weight: string;
  purity: string;
  price: string;
  description: string;
  condition: string;
}

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  goldBarImageSrc: string;
  silverBarImageSrc: string;
  onWhatsAppClick: () => void;
}> = ({ product, goldBarImageSrc, silverBarImageSrc, onWhatsAppClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="bg-card border-border hover:border-gold/50 transition-all duration-300 overflow-hidden group flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-charcoal-light h-48">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          <Image
            src={product.metal === "Gold" ? goldBarImageSrc : silverBarImageSrc}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Details */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  product.metal === "Gold"
                    ? "bg-gold/20 text-gold"
                    : "bg-silver/20 text-silver"
                }`}
              >
                {product.metal === "Gold" ? "Emas" : "Perak"}
              </span>
              <span className="px-2 py-1 text-xs font-semibold rounded bg-muted text-muted-foreground">
                {product.condition}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-semibold mb-2">
              {product.name}
            </h3>

            <div className="space-y-1 text-sm text-muted-foreground mb-4">
              <p>
                <span className="font-medium">Berat:</span> {product.weight}
              </p>
              <p>
                <span className="font-medium">Kemurnian:</span> {product.purity}
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-auto">
            <p className="text-2xl md:text-3xl font-bold text-gold mb-4">
              {product.price}
            </p>

            <Button
              className="w-full bg-gold hover:bg-gold-dark text-primary-foreground transition-all duration-300 text-sm md:text-base"
              onClick={onWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Pesan via WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"Semua" | "Emas" | "Perak">("Semua");
  const [weightFilter, setWeightFilter] = useState<string | null>(null);
  const [showWeightFilters, setShowWeightFilters] = useState(false);

  // Extract unique weights from products
  const availableWeights = Array.from(
    new Set(products.map((p) => p.weight))
  ).sort();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "6285183306699";
    const message = encodeURIComponent(
      "Halo, saya tertarik untuk membeli logam mulia dari silvergold.id"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const filteredProducts = products.filter((product) => {
    // Filter by metal type
    if (filter === "Emas" && product.metal !== "Gold") return false;
    if (filter === "Perak" && product.metal !== "Silver") return false;

    // Filter by weight
    if (weightFilter && product.weight !== weightFilter) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-charcoal border-b border-gold/30 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Katalog <span className="text-gradient-gold">Logam Mulia</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2">
            Jelajahi koleksi lengkap emas dan perak kami
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-col items-center gap-4 mb-12">
            {/* Metal Type Filter */}
            <div className="flex justify-center gap-3 sm:gap-4">
              <Button
                variant={filter === "Semua" ? "default" : "outline"}
                className={`${
                  filter === "Semua"
                    ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                    : "border-border hover:border-gold"
                }`}
                onClick={() => setFilter("Semua")}
              >
                Semua
              </Button>
              <Button
                variant={filter === "Emas" ? "default" : "outline"}
                className={`${
                  filter === "Emas"
                    ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                    : "border-border hover:border-gold"
                }`}
                onClick={() => setFilter("Emas")}
              >
                Emas
              </Button>
              <Button
                variant={filter === "Perak" ? "default" : "outline"}
                className={`${
                  filter === "Perak"
                    ? "bg-silver hover:bg-silver-dark text-primary-foreground"
                    : "border-border hover:border-silver"
                }`}
                onClick={() => setFilter("Perak")}
              >
                Perak
              </Button>
            </div>

            {/* Weight Filter Toggle */}
            <Button
              variant="ghost"
              className="text-gold hover:text-gold-dark hover:bg-gold/10"
              onClick={() => setShowWeightFilters(!showWeightFilters)}
            >
              Filter Berdasarkan Berat
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  showWeightFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Weight Filter Options (Collapsible) */}
            {showWeightFilters && (
              <div className="flex flex-wrap justify-center gap-2 px-4 animate-in fade-in slide-in-from-top-2">
                <Button
                  variant={weightFilter === null ? "default" : "outline"}
                  size="sm"
                  className={`${
                    weightFilter === null
                      ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                      : "border-border hover:border-gold"
                  }`}
                  onClick={() => setWeightFilter(null)}
                >
                  Semua Berat
                </Button>
                {availableWeights.map((weight) => (
                  <Button
                    key={weight}
                    variant={weightFilter === weight ? "default" : "outline"}
                    size="sm"
                    className={`${
                      weightFilter === weight && filter === "Emas"
                        ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                        : weightFilter === weight && filter === "Perak"
                        ? "bg-silver hover:bg-silver-dark text-primary-foreground"
                        : "border-border hover:border-gold"
                    }`}
                    onClick={() => setWeightFilter(weight)}
                  >
                    {weight}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </Card>
                ))
              : filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    goldBarImageSrc={goldBarImageSrc}
                    silverBarImageSrc={silverBarImageSrc}
                    onWhatsAppClick={handleWhatsAppClick}
                  />
                ))}
          </div>

          {/* No Products Message */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Tidak ada produk yang tersedia saat ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
