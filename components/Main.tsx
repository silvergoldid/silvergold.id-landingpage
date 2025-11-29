/**
 * SilverGold.ID - Main Component
 * A luxury precious metals e-commerce landing page
 * Refactored into modular components for better maintainability
 */

"use client";

import React, { useEffect, useState } from "react";

// Import section components
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { PriceBar } from "@/components/sections/PriceBar";
import {
  Catalog,
  type Product,
  type MarketPrice,
} from "@/components/sections/Catalog";
import { Benefits } from "@/components/sections/Benefits";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { handleWhatsAppClick } from "@/lib/utils";

// Re-export types
// export type { Product, MarketPrice };

// Export UI components for backward compatibility
export { Button } from "@/components/ui/button";
export { Card, CardContent } from "@/components/ui/card";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Export utility function
export { cn } from "@/lib/utils";

// Export section components
export { Navigation, Hero, PriceBar, Catalog, Benefits, HowToBuy, FAQ, Footer };

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const heroImageSrc =
  "https://images.pexels.com/photos/34962375/pexels-photo-34962375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const goldBarImageSrc =
  "https://silvergold.lovable.app/assets/gold-bar-D2ySwO4d.jpg";
const silverBarImageSrc =
  "https://silvergold.lovable.app/assets/silver-bar-BlTK1x4I.jpg";
const logoSrc =
  "https://images.pexels.com/photos/34928833/pexels-photo-34928833.png?auto=compress&cs=tinysrgb&w=600&loading=lazy";

export const IndexPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [marketPrice, setMarketPrice] = useState<MarketPrice>({
    gold_price: "",
    silver_price: "",
  });

  const fetchData = async () => {
    try {
      const [productsRes, pricesRes] = await Promise.all([
        fetch("https://silvergold-id-landingpage.onrender.com/v1/product"),
        fetch(
          "https://silvergold-id-landingpage.onrender.com/v1/market-prices"
        ),
        // fetch("http://localhost:4000/v1/product"),
        // fetch("http://localhost:4000/v1/market-prices"),
      ]);
      if (!productsRes.ok || !pricesRes.ok) {
        throw new Error(
          `HTTP error! status: ${productsRes.status} or ${pricesRes.status}`
        );
      }
      const productsData = await productsRes.json();
      const pricesData = await pricesRes.json();
      setProducts(productsData);
      setMarketPrice(pricesData);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  // const testWarehouse = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/v1/warehouse/c93c7ca9-4172-45b5-999c-14024aa2fe06"
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     // console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Failed to fetch items:", error);
  //   }
  // };

  // const checkShippingRates = async () => {
  //   const payload = {
  //     weight: 1, // Hardcoded weight
  //     zipcode_pickup: "12530", // Hardcoded pickup zipcode
  //     destination: "Denpasar Selatan, Kota Denpasar, Bali 80114, Indonesia", // Hardcoded destination
  //     zipcode_destination: "80222", // Hardcoded destination zipcode
  //   };
  //   try {
  //     // Make the API request
  //     const response = await fetch("http://localhost:4000/v1/check-ongkir", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     // Parse the response
  //     const data = await response.json();
  //     console.log(data);
  //     // Check if the response is successful
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while checking shipping rates.");
  //   }
  // };

  useEffect(() => {
    fetchData();
    // checkShippingRates();
    // testWarehouse();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onWhatsAppClick={(msg) => handleWhatsAppClick(msg)}
        logoSrc={logoSrc}
      />
      <Hero
        onWhatsAppClick={(msg) => handleWhatsAppClick(msg)}
        heroImageSrc={heroImageSrc}
      />
      <PriceBar marketPrice={marketPrice} />
      <Catalog
        products={products}
        onWhatsAppClick={(msg) => handleWhatsAppClick(msg)}
        goldBarImageSrc={goldBarImageSrc}
        silverBarImageSrc={silverBarImageSrc}
      />
      <Benefits />
      <HowToBuy />
      <FAQ />
      <Footer
        onWhatsAppClick={(msg) => handleWhatsAppClick(msg)}
        logoSrc={logoSrc}
      />
    </div>
  );
};

export default IndexPage;
