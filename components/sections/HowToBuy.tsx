import React from "react";
import { Search, MessageCircle, CreditCard, TruckIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stepsData = [
  {
    icon: Search,
    number: "01",
    title: "Pilih Produk di Katalog",
    description:
      "Telusuri katalog kami dan pilih logam mulia yang Anda inginkan, mulai dari berbagai brand dan ukuran.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Hubungi Kami via WhatsApp (Chat)",
    description:
      "Informasikan detail produk pilihan Anda. Tim kami akan menghitung total belanja, termasuk ongkir dan opsi asuransi.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Lakukan Pembayaran ke Rekening Resmi",
    description:
      "Kami akan mengirimkan nomor rekening resmi SilverGold. Setelah pembayaran terverifikasi, pesanan langsung diproses.",
  },
  {
    icon: TruckIcon,
    number: "04",
    title: "Pengiriman Aman & Terproteksi",
    description:
      "Produk dikemas rapi dan dikirim dengan standar keamanan tinggi. Asuransi tersedia sesuai permintaan.",
  },
];

export const HowToBuy: React.FC = () => {
  return (
    <section id="how-to-buy" className="py-20 bg-charcoal/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cara Membeli di{" "}
            <span className="text-gradient-gold">silvergold.id</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Proses pembelian dirancang sederhana dan aman, agar Anda dapat
            bertransaksi dengan nyaman.
          </p>
        </div>

        {/* Mobile/Medium: Horizontal scroll, Large: 4-column grid */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-x-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex lg:grid lg:grid-cols-4 gap-8 min-w-max lg:min-w-0">
            {stepsData.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < stepsData.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/50 to-gold/20" />
                )}

                <Card className="relative bg-card border-border hover:border-gold/50 transition-all duration-300 h-full flex flex-col w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink">
                  <CardContent className="p-6 text-center space-y-4 flex flex-col flex-1 items-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/50 relative">
                      <step.icon className="h-10 w-10 text-gold" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gold text-primary-foreground flex items-center justify-center text-xs md:text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HowTo Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cara Membeli Emas & Perak di silvergold.id",
            description:
              "Panduan langkah demi langkah untuk membeli logam mulia emas dan perak secara aman di silvergold.id.",
            step: stepsData.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.description,
              image: "https://silvergold.id/logo.png", // Replace with actual step images if available
            })),
          }),
        }}
      />
    </section>
  );
};
