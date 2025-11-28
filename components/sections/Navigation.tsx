import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              Katalog
            </button>
            <button
              onClick={() => scrollToSection("how-to-buy")}
              className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              Cara Beli
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              Kontak
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
              onClick={onWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Konsultasi
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden border-t border-border bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                scrollToSection("home");
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-base text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all py-2"
            >
              Beranda
            </button>
            <button
              onClick={() => {
                scrollToSection("catalog");
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all py-2"
            >
              Katalog
            </button>
            <button
              onClick={() => {
                scrollToSection("how-to-buy");
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all py-2"
            >
              Cara Beli
            </button>
            <button
              onClick={() => {
                scrollToSection("faq");
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all py-2"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all py-2"
            >
              Kontak
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
