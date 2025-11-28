/**
 * SilverGold.ID - Main Component
 * A luxury precious metals e-commerce landing page
 * Refactored into modular components for better maintainability
 */

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
import { handleContactUs } from "@/lib/utils";

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
const whatsappUrl = "https://wa.me/6285110328180";
// const products = [
//   {
//     id: "c93c7ca9-4172-45b5-999c-14024aa2fe06",
//     metal: "Gold",
//     name: "Gold Bar IK 1000kg",
//     weight: "1 gram",
//     purity: "99.99%",
//     price: "Rp 2.199.000",
//     description:
//       "1g gold bar with certificate, ideal for first-time investors.",
//     sort_order: 1,
//     condition: "Baru",
//   },
//   {
//     id: "bcae1baa-eccb-482e-a994-c52686efb459",
//     metal: "Gold",
//     name: "Gold Bar 5g",
//     weight: "5 grams",
//     purity: "99.99%",
//     price: "Rp 12.258.750",
//     description: "5g gold bar for gradual wealth accumulation.",
//     sort_order: 2,
//     condition: "Baru",
//   },
//   {
//     id: "d8051cac-d741-420e-a197-dcb3a096f3e4",
//     metal: "Gold",
//     name: "Gold Bar 10g",
//     weight: "10 grams",
//     purity: "99.99%",
//     price: "Rp 24.459.750",
//     description: "10g gold bar, popular choice for diversified portfolios.",
//     sort_order: 3,
//     condition: "Baru",
//   },
//   {
//     id: "2c4d6dd2-1f76-4676-93db-76722355e774",
//     metal: "Gold",
//     name: "Gold Bar 25g",
//     weight: "25 grams",
//     purity: "99.99%",
//     price: "Rp 61.017.600",
//     description: "25g gold bar for serious long-term investment.",
//     sort_order: 4,
//     condition: "Baru",
//   },
//   {
//     id: "bd9582fa-028c-49a0-80b3-3c06fb1d9114",
//     metal: "Gold",
//     name: "Gold Bar 50g",
//     weight: "50 grams",
//     purity: "99.99%",
//     price: "Rp 121.952.250",
//     description: "50g gold bar, efficient for larger capital deployment.",
//     sort_order: 5,
//     condition: "Baru",
//   },
//   {
//     id: "a4e101c7-50cd-4ff2-a8c4-e76b62d000cd",
//     metal: "Gold",
//     name: "Gold Bar 100g",
//     weight: "100 grams",
//     purity: "99.99%",
//     price: "Rp 243.822.600",
//     description: "100g gold bar for high-value, compact storage.",
//     sort_order: 6,
//     condition: "Baru",
//   },
//   {
//     id: "f848a734-d7c6-455a-920c-e3bf509478fc",
//     metal: "Gold",
//     name: "Gold Bar 500g",
//     weight: "500 grams",
//     purity: "99.99%",
//     price: "Rp 1.218.336.000",
//     description:
//       "500g gold bar, suitable for advanced investors and asset protection.",
//     sort_order: 7,
//     condition: "Baru",
//   },
//   {
//     id: "dee5863a-3fb1-457c-a8e3-11ac774d4fc4",
//     metal: "Gold",
//     name: "Gold Bar 1kg",
//     weight: "1.000 grams",
//     purity: "99.99%",
//     price: "Rp 2.436.630.000",
//     description: "1kg gold bar, institutional-level gold holding.",
//     sort_order: 8,
//     condition: "Baru",
//   },
//   {
//     id: "aca937a3-fcdd-4407-8457-e382707fce96",
//     metal: "Silver",
//     name: "Silver Bar 1g",
//     weight: "1 gram",
//     purity: "99.9%",
//     price: "Rp 28.971",
//     description: "1g silver bar, accessible entry to silver investment.",
//     sort_order: 9,
//     condition: "Baru",
//   },
//   {
//     id: "3ca7e15d-8c8f-4f1e-a480-fb143f3425df",
//     metal: "Silver",
//     name: "Silver Bar 5g",
//     weight: "5 grams",
//     purity: "99.9%",
//     price: "Rp 144.853",
//     description: "5g silver bar for small but consistent stacking.",
//     sort_order: 10,
//     condition: "Baru",
//   },
//   {
//     id: "9087468c-609a-421b-821a-d7b3f27b5132",
//     metal: "Silver",
//     name: "Silver Bar 10g",
//     weight: "10 grams",
//     purity: "99.9%",
//     price: "Rp 289.706",
//     description: "10g silver bar, popular size for collectors.",
//     sort_order: 11,
//     condition: "Baru",
//   },
//   {
//     id: "3fa73ab5-4a55-4f7b-a4cf-9f30399560f8",
//     metal: "Silver",
//     name: "Silver Bar 25g",
//     weight: "25 grams",
//     purity: "99.9%",
//     price: "Rp 724.264",
//     description: "25g silver bar, ideal for building silver reserves.",
//     sort_order: 12,
//     condition: "Baru",
//   },
//   {
//     id: "b5ccea48-3f6e-49f5-8f8f-cfed06b2af2e",
//     metal: "Silver",
//     name: "Silver Bar 50g",
//     weight: "50 grams",
//     purity: "99.9%",
//     price: "Rp 1.448.528",
//     description: "50g silver bar for medium-sized investments.",
//     sort_order: 13,
//     condition: "Baru",
//   },
//   {
//     id: "dc0bfae1-1a7f-4463-965e-e868ff8531a1",
//     metal: "Silver",
//     name: "Silver Bar 100g",
//     weight: "100 grams",
//     purity: "99.9%",
//     price: "Rp 2.897.055",
//     description: "100g silver bar, efficient in terms of spread vs size.",
//     sort_order: 14,
//     condition: "Baru",
//   },
//   {
//     id: "9b4cee61-f94c-4aa5-88d7-2f63ef1dab25",
//     metal: "Silver",
//     name: "Silver Bar 500g",
//     weight: "500 grams",
//     purity: "99.9%",
//     price: "Rp 14.485.275",
//     description: "500g silver bar, great for long-term silver stacking.",
//     sort_order: 15,
//     condition: "Baru",
//   },
//   {
//     id: "890a4c84-e8e7-4b93-a7e6-c7eff9f98f98",
//     metal: "Silver",
//     name: "Silver Bar 1kg",
//     weight: "1.000 grams",
//     purity: "99.9%",
//     price: "Rp 28.970.550",
//     description: "1kg silver bar, bulk position for silver believers.",
//     sort_order: 16,
//     condition: "Baru",
//   },
// ];

// export interface IndexPageProps {
//   products: Product[];
//   onWhatsAppClick: () => void;
//   whatsappUrl: string;
//   logoSrc: string;
//   heroImageSrc: string;
//   goldBarImageSrc: string;
//   silverBarImageSrc: string;
// }

export const IndexPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [marketPrice, setMarketPrice] = useState<MarketPrice>({
    gold_price: "",
    silver_price: "",
  });

  const fetchData = async () => {
    try {
      const [productsRes, pricesRes] = await Promise.all([
        fetch("https://silvergold-id-landingpage.onrender.com/v1/products"),
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
      <Navigation onWhatsAppClick={handleContactUs} logoSrc={logoSrc} />
      <Hero onWhatsAppClick={handleContactUs} heroImageSrc={heroImageSrc} />
      <PriceBar marketPrice={marketPrice} />
      <Catalog
        products={products}
        onWhatsAppClick={handleContactUs}
        goldBarImageSrc={goldBarImageSrc}
        silverBarImageSrc={silverBarImageSrc}
      />
      <Benefits />
      <HowToBuy />
      <FAQ />
      <Footer
        onWhatsAppClick={handleContactUs}
        whatsappUrl={whatsappUrl}
        logoSrc={logoSrc}
      />
    </div>
  );
};

export default IndexPage;
