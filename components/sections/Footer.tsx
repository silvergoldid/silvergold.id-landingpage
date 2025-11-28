import React from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Mail,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FooterProps {
  onWhatsAppClick: () => void;
  whatsappUrl: string;
  logoSrc: string;
}

export const Footer: React.FC<FooterProps> = ({
  onWhatsAppClick,
  whatsappUrl,
  logoSrc,
}) => {
  // Extract phone number from WhatsApp URL for display
  const phoneNumber = whatsappUrl.replace("https://wa.me/", "");
  const formattedPhone = phoneNumber.replace(
    /(\d{2})(\d{3})(\d{4})(\d{4})/,
    "+$1 $2-$3-$4"
  );

  return (
    <footer
      id="contact"
      className="bg-charcoal border-t border-gold/30 pt-20 pb-10"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* WhatsApp CTA Banner */}
        <div className="bg-gradient-to-r from-gold via-amber-500 to-gold rounded-2xl p-6 md:p-8 mb-12 shadow-xl shadow-gold/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left - Trust Message */}
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
                Platform Terpercaya untuk
                <br className="hidden md:block" />
                Investasi Emas & Perak.
              </h3>
              <p className="text-xs md:text-base text-primary-foreground/90">
                Konsultasi gratis dengan spesialis logam mulia kami
              </p>
            </div>

            {/* Right - WhatsApp Button */}
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-charcoal border-0 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex-shrink-0"
              onClick={onWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat WhatsApp
            </Button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-border">
          {/* Left - Brand */}
          <div>
            <img src={logoSrc} alt="silvergold.id" className="h-20 w-auto" />
            <p className="text-sm md:text-base text-muted-foreground max-w-md">
              Mitra terpercaya Anda untuk investasi emas dan perak fisik.
              Membangun dan melindungi kekayaan melalui logam mulia
              bersertifikat.
            </p>
          </div>

          {/* Center - Social Media & Email */}
          <div className="flex flex-col space-y-3 items-start md:items-center">
            <h5 className="font-semibold text-sm md:text-lg text-gold mb-2 pt-7">
              Ikuti Kami
            </h5>
            <a
              href="https://instagram.com/silvergold.id_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <Instagram className="h-5 w-5 text-gold" />
              <span className="text-xs md:text-base">@silvergold.id_</span>
            </a>
            <a
              href="https://tiktok.com/@silvergold.id_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <svg
                className="h-5 w-5 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span className="text-xs md:text-base">@silvergold.id_</span>
            </a>
            <a
              href="mailto:hi@silvergold.id"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <Mail className="h-5 w-5 text-gold" />
              <span className="text-xs md:text-base">hi@silvergold.id</span>
            </a>
          </div>

          {/* Right - Contact Information */}
          <div className="flex flex-col md:items-end space-y-3">
            <h5 className="font-semibold text-sm md:text-lg text-gold mb-2 pt-7">
              Informasi Kontak
            </h5>
            <div className="flex items-start gap-2 text-muted-foreground md:text-right">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0 md:order-2" />
              <span className="text-xs md:text-base">Tangerang Selatan</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-gold md:order-2" />
              <span className="text-xs md:text-base">Setiap Hari, 24 Jam</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-5 w-5 text-gold md:order-2" />
              <span className="text-xs md:text-base">{formattedPhone}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} silvergold.id. Hak cipta
            dilindungi.
          </p>
          <p className="mt-2">
            Investasi logam mulia mengandung risiko. Harap berinvestasi dengan
            bijak dan konsultasikan dengan spesialis kami.
          </p>
        </div>

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "silvergold.id",
              url: "https://silvergold.id",
              logo: "https://silvergold.id/logo.png",
              sameAs: [
                "https://instagram.com/silvergold.id_",
                "https://tiktok.com/@silvergold.id_",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: formattedPhone,
                contactType: "customer service",
                areaServed: "ID",
                availableLanguage: "Indonesian",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tangerang Selatan",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </div>
    </footer>
  );
};
