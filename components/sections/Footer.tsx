import React from "react";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
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
    <footer id="contact" className="bg-charcoal border-t border-gold/30 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* WhatsApp CTA Section */}
        <div className="bg-card border border-gold/50 rounded-xl p-8 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-gold" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Pemesanan & Konsultasi via WhatsApp
          </h3>
          <p className="text-muted-foreground mb-6">
            Terhubung langsung dengan tim spesialis logam mulia kami
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-dark text-primary-foreground glow-gold transition-all duration-300"
            onClick={onWhatsAppClick}
          >
            <Phone className="mr-2 h-5 w-5" />
            {formattedPhone}
          </Button>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 pb-8 border-b border-border">
          {/* Left - Brand */}
          <div>
            <img src={logoSrc} alt="silvergold.id" className="h-20 w-auto" />
            <p className="text-muted-foreground max-w-md">
              Mitra terpercaya Anda untuk investasi emas dan perak fisik.
              Membangun dan melindungi kekayaan melalui logam mulia
              bersertifikat.
            </p>
          </div>

          {/* Right - Contact Information */}
          <div className="flex flex-col md:items-end space-y-3">
            <h5 className="font-semibold text-gold mb-2">Informasi Kontak</h5>
            <div className="flex items-start gap-2 text-muted-foreground md:text-right">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0 md:order-2" />
              <span className="text-sm">Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-gold md:order-2" />
              <span className="text-sm">Setiap Hari, 24 Jam</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-5 w-5 text-gold md:order-2" />
              <span className="text-sm">{formattedPhone}</span>
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
      </div>
    </footer>
  );
};
