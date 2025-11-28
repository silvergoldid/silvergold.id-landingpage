import React from "react";
import { TrendingUp, Award, Zap, TruckIcon, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefitsData = [
  {
    icon: TrendingUp,
    title: "Harga Real-Time & Transparan",
    description:
      "Harga diperbarui otomatis setiap hari. Tidak ada markup tersembunyi, tidak ada manipulasi harga.",
  },
  {
    icon: Award,
    title: "Produk Asli & Terverifikasi",
    description:
      "Semua logam mulia berasal dari brand resmi dan distributor terpercaya. Kami hanya menjual produk yang 100% asli.",
  },
  {
    icon: Zap,
    title: "Proses Pembelian yang Sederhana",
    description:
      "Tidak ada prosedur rumit. Pembelian sengaja kami desain cepat & efisien.",
  },
  {
    icon: TruckIcon,
    title: "Pengiriman Aman & Terlindungi",
    description:
      "Setiap paket dikemas rapi dengan standar keamanan tinggi agar sampai dengan kondisi yang baik.",
  },
  {
    icon: MessageSquare,
    title: "Layanan Responsif",
    description:
      "Tim kami siap membantu pertanyaan Anda dengan cepat, tanpa harus menunggu lama atau bolak-balik tanya harga.",
  },
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kenapa Memilih{" "}
            <span className="text-gradient-gold">silvergold.id</span>?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Harga real-time, produk resmi, dan proses pembelian yang dibuat
            sesederhana mungkin.
          </p>
        </div>

        <div className="overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-6 min-w-max">
            {benefitsData.map((benefit, index) => (
              <Card
                key={index}
                className="bg-card border-gold/30 hover:border-gold transition-all duration-300 hover:glow-gold w-[280px] flex-shrink-0"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/50">
                    <benefit.icon
                      className="h-8 w-8 text-gold"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
