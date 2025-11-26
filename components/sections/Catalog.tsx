import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  metal: string;
  name: string;
  weight: string;
  purity: string;
  price: string;
  description: string;
  condition: string;
  sort_order: number;
}

export interface CatalogProps {
  products: Product[];
  onWhatsAppClick: () => void;
  goldBarImageSrc: string;
  silverBarImageSrc: string;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onWhatsAppClick,
  goldBarImageSrc,
  silverBarImageSrc,
}) => {
  const [filter, setFilter] = useState<"Semua" | "Emas" | "Perak">("Semua");

  const filteredProducts = products.filter((product) => {
    if (filter === "Semua") return true;
    if (filter === "Emas") return product.metal === "Gold";
    if (filter === "Perak") return product.metal === "Silver";
    return true;
  });

  // Generate Product schema for first few products (to avoid excessive data)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 8).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        offers: {
          "@type": "Offer",
          price: product.price.replace(/[^0-9]/g, ""),
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "silvergold.id",
          },
        },
      },
    })),
  };

  return (
    <section id="catalog" className="py-20 bg-charcoal/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Katalog Logam <span className="text-gradient-gold">Mulia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Temukan pilihan emas dan perak dari berbagai brand resmi, tersedia
            dalam beragam ukuran — mulai dari 1 gram hingga 100 gram.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={filter === "Semua" ? "default" : "outline"}
            className={
              filter === "Semua"
                ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                : "border-border hover:border-gold"
            }
            onClick={() => setFilter("Semua")}
          >
            Semua
          </Button>
          <Button
            variant={filter === "Emas" ? "default" : "outline"}
            className={
              filter === "Emas"
                ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                : "border-border hover:border-gold"
            }
            onClick={() => setFilter("Emas")}
          >
            Batangan Emas
          </Button>
          <Button
            variant={filter === "Perak" ? "default" : "outline"}
            className={
              filter === "Perak"
                ? "bg-silver hover:bg-silver-dark text-primary-foreground"
                : "border-border hover:border-silver"
            }
            onClick={() => setFilter("Perak")}
          >
            Batangan Perak
          </Button>
        </div>

        {/* Product Grid */}
        {/* Mobile/Medium: Horizontal scroll, Large: 4-column grid */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-x-visible">
          <div className="flex lg:grid lg:grid-cols-4 gap-6 min-w-max lg:min-w-0">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-card border-border hover:border-gold/50 transition-all duration-300 overflow-hidden group flex flex-col h-full w-[320px] lg:w-auto flex-shrink-0 lg:flex-shrink"
              >
                <CardContent className="p-0 flex flex-col flex-1">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-charcoal-light">
                    <img
                      src={
                        product.metal === "Gold"
                          ? goldBarImageSrc
                          : silverBarImageSrc
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        product.metal === "Gold"
                          ? "bg-gold/20 text-gold border border-gold/50"
                          : "bg-silver/20 text-silver border border-silver/50"
                      }`}
                    >
                      {product.metal === "Gold" ? "Emas" : "Perak"}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold">{product.name}</h3>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {product.weight}
                      </span>
                      <span className="text-gold font-semibold">
                        {product.purity}
                      </span>
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Kondisi: </span>
                      <span className="text-foreground font-medium">
                        {product.condition}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="pt-3 border-t border-border mt-auto">
                      <p className="text-2xl font-bold text-gold mb-1">
                        {product.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        *Harga indikatif, final dikonfirmasi via WhatsApp.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-gold hover:bg-gold-dark text-primary-foreground transition-all duration-300"
                      onClick={onWhatsAppClick}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Pesan via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
