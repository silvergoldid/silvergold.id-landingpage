import React from "react";
import Image from "next/image";
import {
  CheckCircle,
  ShieldCheck,
  TruckIcon,
  Award,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  onWhatsAppClick: () => void;
  heroImageSrc: string;
}

export const Hero: React.FC<HeroProps> = ({
  onWhatsAppClick,
  heroImageSrc,
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageSrc}
          alt="Gold and silver investment background"
          fill
          priority
          quality={75}
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-10">
          Mulai Investasi <span className="text-gradient-gold">Emas</span> &{" "}
          <span className="text-gradient-silver">Perak</span>
          <br />
          Hari Ini – Dari 1 Gram saja.
        </h1>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-lg text-foreground">
                  Cocok untuk Tabungan Jangka Panjang
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-lg text-foreground">
                  Nilai Stabil & Tahan Inflasi
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-lg text-foreground">
                  Pembelian Mudah, Mulai dari 1 Gram
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-lg text-foreground">
                  Produk Resmi, Terverifikasi, & Siap Disimpan
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary-foreground glow-gold transition-all duration-300 text-sm md:text-lg whitespace-nowrap"
                onClick={onWhatsAppClick}
              >
                Pesan via WhatsApp
              </Button>
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary-foreground glow-gold transition-all duration-300 text-sm md:text-lg whitespace-nowrap"
                onClick={() => scrollToSection("catalog")}
              >
                Lihat Katalog Produk
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <span className="text-sm md:text-base">Toko terpercaya</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TruckIcon className="h-5 w-5 text-gold" />
                <span className="text-sm md:text-base">Pengiriman Aman</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-gold" />
                <span className="text-sm md:text-base">Bersertifikat</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-5 w-5 text-gold" />
                <span className="text-sm md:text-base">Opsi Buyback</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          {/* <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-silver/20 rounded-2xl blur-3xl" />
            <Image
              src={heroImageSrc}
              alt="Luxury gold and silver bars"
              width={1200}
              height={675}
              priority
              fetchPriority="high"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};
