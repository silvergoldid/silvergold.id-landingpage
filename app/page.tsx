// app/page.js
"use client";

import IndexPage from "@/components/Main";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <h1 className="text-4xl font-bold">SilverGold.ID - Landing Page</h1>
    //   <p>Selamat datang di proyek Next.js Anda!</p>
    // </main>
    <IndexPage
      heroImageSrc="https://silvergold.lovable.app/assets/hero-precious-metals-CLcrZG1n.jpg"
      goldBarImageSrc="https://silvergold.lovable.app/assets/gold-bar-D2ySwO4d.jpg"
      silverBarImageSrc="https://silvergold.lovable.app/assets/silver-bar-BlTK1x4I.jpg"
      logoSrc="https://images.pexels.com/photos/34928833/pexels-photo-34928833.png?auto=compress&cs=tinysrgb&w=600&loading=lazy"
      whatsappUrl="https://wa.me/6285110328180"
      onWhatsAppClick={() =>
        window.open("https://wa.me/6285110328180", "_blank")
      }
      products={[
        {
          id: "c93c7ca9-4172-45b5-999c-14024aa2fe06",
          metal: "Gold",
          name: "Gold Bar IK 1000kg",
          weight: "1 gram",
          purity: "99.99%",
          price: "Rp 2.199.000",
          description:
            "1g gold bar with certificate, ideal for first-time investors.",
          sort_order: 1,
          condition: "Baru",
        },
        {
          id: "bcae1baa-eccb-482e-a994-c52686efb459",
          metal: "Gold",
          name: "Gold Bar 5g",
          weight: "5 grams",
          purity: "99.99%",
          price: "Rp 12.258.750",
          description: "5g gold bar for gradual wealth accumulation.",
          sort_order: 2,
          condition: "Baru",
        },
        {
          id: "d8051cac-d741-420e-a197-dcb3a096f3e4",
          metal: "Gold",
          name: "Gold Bar 10g",
          weight: "10 grams",
          purity: "99.99%",
          price: "Rp 24.459.750",
          description:
            "10g gold bar, popular choice for diversified portfolios.",
          sort_order: 3,
          condition: "Baru",
        },
        {
          id: "2c4d6dd2-1f76-4676-93db-76722355e774",
          metal: "Gold",
          name: "Gold Bar 25g",
          weight: "25 grams",
          purity: "99.99%",
          price: "Rp 61.017.600",
          description: "25g gold bar for serious long-term investment.",
          sort_order: 4,
          condition: "Baru",
        },
        {
          id: "bd9582fa-028c-49a0-80b3-3c06fb1d9114",
          metal: "Gold",
          name: "Gold Bar 50g",
          weight: "50 grams",
          purity: "99.99%",
          price: "Rp 121.952.250",
          description: "50g gold bar, efficient for larger capital deployment.",
          sort_order: 5,
          condition: "Baru",
        },
        {
          id: "a4e101c7-50cd-4ff2-a8c4-e76b62d000cd",
          metal: "Gold",
          name: "Gold Bar 100g",
          weight: "100 grams",
          purity: "99.99%",
          price: "Rp 243.822.600",
          description: "100g gold bar for high-value, compact storage.",
          sort_order: 6,
          condition: "Baru",
        },
        {
          id: "f848a734-d7c6-455a-920c-e3bf509478fc",
          metal: "Gold",
          name: "Gold Bar 500g",
          weight: "500 grams",
          purity: "99.99%",
          price: "Rp 1.218.336.000",
          description:
            "500g gold bar, suitable for advanced investors and asset protection.",
          sort_order: 7,
          condition: "Baru",
        },
        {
          id: "dee5863a-3fb1-457c-a8e3-11ac774d4fc4",
          metal: "Gold",
          name: "Gold Bar 1kg",
          weight: "1.000 grams",
          purity: "99.99%",
          price: "Rp 2.436.630.000",
          description: "1kg gold bar, institutional-level gold holding.",
          sort_order: 8,
          condition: "Baru",
        },
        {
          id: "aca937a3-fcdd-4407-8457-e382707fce96",
          metal: "Silver",
          name: "Silver Bar 1g",
          weight: "1 gram",
          purity: "99.9%",
          price: "Rp 28.971",
          description: "1g silver bar, accessible entry to silver investment.",
          sort_order: 9,
          condition: "Baru",
        },
        {
          id: "3ca7e15d-8c8f-4f1e-a480-fb143f3425df",
          metal: "Silver",
          name: "Silver Bar 5g",
          weight: "5 grams",
          purity: "99.9%",
          price: "Rp 144.853",
          description: "5g silver bar for small but consistent stacking.",
          sort_order: 10,
          condition: "Baru",
        },
        {
          id: "9087468c-609a-421b-821a-d7b3f27b5132",
          metal: "Silver",
          name: "Silver Bar 10g",
          weight: "10 grams",
          purity: "99.9%",
          price: "Rp 289.706",
          description: "10g silver bar, popular size for collectors.",
          sort_order: 11,
          condition: "Baru",
        },
        {
          id: "3fa73ab5-4a55-4f7b-a4cf-9f30399560f8",
          metal: "Silver",
          name: "Silver Bar 25g",
          weight: "25 grams",
          purity: "99.9%",
          price: "Rp 724.264",
          description: "25g silver bar, ideal for building silver reserves.",
          sort_order: 12,
          condition: "Baru",
        },
        {
          id: "b5ccea48-3f6e-49f5-8f8f-cfed06b2af2e",
          metal: "Silver",
          name: "Silver Bar 50g",
          weight: "50 grams",
          purity: "99.9%",
          price: "Rp 1.448.528",
          description: "50g silver bar for medium-sized investments.",
          sort_order: 13,
          condition: "Baru",
        },
        {
          id: "dc0bfae1-1a7f-4463-965e-e868ff8531a1",
          metal: "Silver",
          name: "Silver Bar 100g",
          weight: "100 grams",
          purity: "99.9%",
          price: "Rp 2.897.055",
          description: "100g silver bar, efficient in terms of spread vs size.",
          sort_order: 14,
          condition: "Baru",
        },
        {
          id: "9b4cee61-f94c-4aa5-88d7-2f63ef1dab25",
          metal: "Silver",
          name: "Silver Bar 500g",
          weight: "500 grams",
          purity: "99.9%",
          price: "Rp 14.485.275",
          description: "500g silver bar, great for long-term silver stacking.",
          sort_order: 15,
          condition: "Baru",
        },
        {
          id: "890a4c84-e8e7-4b93-a7e6-c7eff9f98f98",
          metal: "Silver",
          name: "Silver Bar 1kg",
          weight: "1.000 grams",
          purity: "99.9%",
          price: "Rp 28.970.550",
          description: "1kg silver bar, bulk position for silver believers.",
          sort_order: 16,
          condition: "Baru",
        },
      ]}
    />
  );
}
