import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NavigationProps {
  onWhatsAppClick: () => void;
  logoSrc: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onWhatsAppClick,
  logoSrc,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={logoSrc} alt="silvergold.id" className="h-25 w-auto" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Katalog
            </button>
            <button
              onClick={() => scrollToSection("how-to-buy")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Cara Beli
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Kontak
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              onClick={onWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Konsultasi
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
