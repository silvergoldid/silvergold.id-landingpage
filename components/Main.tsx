/**
 * SilverGold.ID - Complete UI Component Library
 * A luxury precious metals e-commerce landing page
 * All UI components combined into a single file
 */

import React, { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  MessageCircle,
  ShieldCheck,
  TruckIcon,
  RefreshCw,
  Package,
  MessageSquare,
  Search,
  CreditCard,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Class name merger utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// UI COMPONENTS - BUTTON
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// ============================================================================
// UI COMPONENTS - CARD
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
        {children}
      </div>
    );
  }
);

// ============================================================================
// UI COMPONENTS - ACCORDION
// ============================================================================

export interface AccordionProps {
  type: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  className,
  children,
}) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};

const AccordionItemContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: false,
  toggle: () => {},
});

export interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle }}>
      <div
        className={cn("border-b", className)}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
}) => {
  const { isOpen, toggle } = React.useContext(AccordionItemContext);

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
    >
      {children}
      <svg
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
}) => {
  const { isOpen } = React.useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all animate-accordion-down",
        className
      )}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENTS - NAVIGATION
// ============================================================================

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

// ============================================================================
// MAIN COMPONENTS - HERO
// ============================================================================

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
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Mulai Investasi <span className="text-gradient-gold">Emas</span> &{" "}
              <span className="text-gradient-silver">Perak</span> Hari Ini –
              Dari 1 Gram saja.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Mulai bangun portofolio logam mulia Anda tanpa tekanan, tanpa
              minimal pembelian besar, dan tanpa proses rumit. Transparan,
              terpercaya, dan terjangkau untuk semua kalangan.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-foreground">
                  Cocok untuk Tabungan Jangka Panjang
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-foreground">
                  Nilai Stabil & Tahan Inflasi
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-foreground">
                  Pembelian Mudah, Mulai dari 1 Gram
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-foreground">
                  Produk Resmi, Terverifikasi, & Siap Disimpan
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary-foreground glow-gold transition-all duration-300 text-lg px-8"
                onClick={onWhatsAppClick}
              >
                Pesan via WhatsApp
              </Button>
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary-foreground glow-gold transition-all duration-300 text-lg px-8"
                onClick={() => scrollToSection("catalog")}
              >
                Lihat Katalog Produk
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <span className="text-sm">Toko terpercaya</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TruckIcon className="h-5 w-5 text-gold" />
                <span className="text-sm">Pengiriman Aman</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-gold" />
                <span className="text-sm">Bersertifikat</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-5 w-5 text-gold" />
                <span className="text-sm">Opsi Buyback</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-silver/20 rounded-2xl blur-3xl" />
            <img
              src={heroImageSrc}
              alt="Luxury gold and silver bars"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENTS - PRICE BAR
// ============================================================================

export const PriceBar: React.FC = () => {
  return (
    <div className="bg-charcoal border-t border-b border-gold/30 py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-foreground">
              Harga Pasar International Hari Ini
            </span>
            <div className="flex gap-4 text-sm">
              <span className="text-gold">● Emas</span>
              <span className="text-silver">● Perak</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            *Harga final dikonfirmasi saat transaksi melalui WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENTS - CATALOG
// ============================================================================

export interface Product {
  id: string;
  metal: string;
  name: string;
  weight: string;
  purity: string;
  price: string;
  description: string;
  condition: string;
  sort_order: number;
}

export interface CatalogProps {
  products: Product[];
  onWhatsAppClick: () => void;
  goldBarImageSrc: string;
  silverBarImageSrc: string;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onWhatsAppClick,
  goldBarImageSrc,
  silverBarImageSrc,
}) => {
  const [filter, setFilter] = useState<"Semua" | "Emas" | "Perak">("Semua");

  const filteredProducts = products.filter((product) => {
    if (filter === "Semua") return true;
    if (filter === "Emas") return product.metal === "Gold";
    if (filter === "Perak") return product.metal === "Silver";
    return true;
  });

  // Generate Product schema for first few products (to avoid excessive data)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 8).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        offers: {
          "@type": "Offer",
          price: product.price.replace(/[^0-9]/g, ""),
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "silvergold.id",
          },
        },
      },
    })),
  };

  return (
    <section id="catalog" className="py-20 bg-charcoal/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Katalog Logam <span className="text-gradient-gold">Mulia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Temukan pilihan emas dan perak dari berbagai brand resmi, tersedia
            dalam beragam ukuran — mulai dari 1 gram hingga 100 gram.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={filter === "Semua" ? "default" : "outline"}
            className={
              filter === "Semua"
                ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                : "border-border hover:border-gold"
            }
            onClick={() => setFilter("Semua")}
          >
            Semua
          </Button>
          <Button
            variant={filter === "Emas" ? "default" : "outline"}
            className={
              filter === "Emas"
                ? "bg-gold hover:bg-gold-dark text-primary-foreground"
                : "border-border hover:border-gold"
            }
            onClick={() => setFilter("Emas")}
          >
            Batangan Emas
          </Button>
          <Button
            variant={filter === "Perak" ? "default" : "outline"}
            className={
              filter === "Perak"
                ? "bg-silver hover:bg-silver-dark text-primary-foreground"
                : "border-border hover:border-silver"
            }
            onClick={() => setFilter("Perak")}
          >
            Batangan Perak
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border hover:border-gold/50 transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              <CardContent className="p-0 flex flex-col flex-1">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-charcoal-light">
                  <img
                    src={
                      product.metal === "Gold"
                        ? goldBarImageSrc
                        : silverBarImageSrc
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.metal === "Gold"
                        ? "bg-gold/20 text-gold border border-gold/50"
                        : "bg-silver/20 text-silver border border-silver/50"
                    }`}
                  >
                    {product.metal === "Gold" ? "Emas" : "Perak"}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold">{product.name}</h3>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {product.weight}
                    </span>
                    <span className="text-gold font-semibold">
                      {product.purity}
                    </span>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Kondisi: </span>
                    <span className="text-foreground font-medium">
                      {product.condition}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-border mt-auto">
                    <p className="text-2xl font-bold text-gold mb-1">
                      {product.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      *Harga indikatif, final dikonfirmasi via WhatsApp.
                    </p>
                  </div>

                  <Button
                    className="w-full bg-gold hover:bg-gold-dark text-primary-foreground transition-all duration-300"
                    onClick={onWhatsAppClick}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Pesan via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENTS - BENEFITS
// ============================================================================

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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Kenapa Memilih{" "}
            <span className="text-gradient-gold">silvergold.id</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Harga real-time, produk resmi, dan proses pembelian yang dibuat
            sesederhana mungkin.
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 min-w-max md:min-w-0">
            {benefitsData.map((benefit, index) => (
              <Card
                key={index}
                className="bg-card border-gold/30 hover:border-gold transition-all duration-300 hover:glow-gold"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/50">
                    <benefit.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
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

// ============================================================================
// MAIN COMPONENTS - HOW TO BUY
// ============================================================================

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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Cara Membeli di{" "}
            <span className="text-gradient-gold">silvergold.id</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Proses pembelian dirancang sederhana dan aman, agar Anda dapat
            bertransaksi dengan nyaman.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stepsData.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/50 to-gold/20" />
              )}

              <Card className="relative bg-card border-border hover:border-gold/50 transition-all duration-300 h-full flex flex-col">
                <CardContent className="p-6 text-center space-y-4 flex flex-col flex-1 items-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/50 relative">
                    <step.icon className="h-10 w-10 text-gold" />
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gold text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENTS - FAQ
// ============================================================================

const faqsData = [
  {
    question: "Apakah emas/peraknya asli?",
    answer:
      "Ya, tentu saja. Semua batangan emas dan perak kami dilengkapi dengan sertifikat keaslian dari refiner yang diakui secara internasional. Setiap batangan distempel dengan kemurnian (99.9% atau 99.99%), berat, dan detail refiner. Kami hanya bersumber dari produsen terpercaya untuk memastikan kualitas investment-grade.",
  },
  {
    question: "Bagaimana harga dihitung?",
    answer:
      "Harga kami didasarkan pada harga spot internasional emas dan perak saat ini (London Bullion Market), ditambah premi kecil untuk menutupi sertifikasi, kemasan aman, asuransi, dan biaya pengiriman. Harga final yang tepat dikonfirmasi pada saat transaksi melalui WhatsApp untuk memastikan transparansi.",
  },
  {
    question: "Bagaimana cara kerja pengiriman dan asuransi?",
    answer:
      "Semua pengiriman diasuransikan penuh dan menggunakan kemasan yang aman dan diskrit. Kami bekerja dengan layanan kurir terpercaya untuk memastikan pengiriman yang aman. Cakupan asuransi sesuai dengan nilai penuh pembelian Anda. Waktu pengiriman biasanya berkisar antara 2-5 hari kerja tergantung pada lokasi Anda.",
  },
  {
    question: "Apakah ada layanan buyback?",
    answer:
      "Ya, kami menawarkan layanan buyback untuk batangan emas dan perak yang dibeli dari kami. Harga buyback didasarkan pada harga spot pasar saat ini pada waktu buyback. Hubungi kami melalui WhatsApp untuk memulai buyback dan mendapatkan penawaran terbaru. Kami bertujuan untuk memberikan likuiditas dan ketenangan pikiran bagi investor kami.",
  },
  {
    question: "Metode pembayaran apa yang diterima?",
    answer:
      "Kami menerima transfer bank (BCA, Mandiri, BNI, dan bank Indonesia utama lainnya). Setelah Anda melakukan pemesanan melalui WhatsApp, tim kami akan memberikan detail pembayaran dan memandu Anda melalui prosesnya. Kami tidak menerima cash on delivery karena alasan keamanan.",
  },
  {
    question: "Bisakah saya mengunjungi kantor untuk melihat produk?",
    answer:
      "Untuk keamanan dan efisiensi operasional, kami beroperasi terutama melalui platform online dan konsultasi WhatsApp kami. Namun, untuk transaksi bernilai tinggi, kami dapat mengatur viewing yang aman dengan perjanjian. Silakan hubungi kami melalui WhatsApp untuk membahas kebutuhan spesifik Anda.",
  },
];

export const FAQ: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Pertanyaan yang Sering{" "}
            <span className="text-gradient-gold">Ditanyakan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Semua yang perlu Anda ketahui tentang membeli logam mulia dengan
            silvergold.id
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqsData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-gold/50 transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold hover:text-gold transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
};

// ============================================================================
// MAIN COMPONENTS - FOOTER
// ============================================================================

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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export interface IndexPageProps {
  products: Product[];
  onWhatsAppClick: () => void;
  whatsappUrl: string;
  logoSrc: string;
  heroImageSrc: string;
  goldBarImageSrc: string;
  silverBarImageSrc: string;
}

export const IndexPage: React.FC<IndexPageProps> = ({
  products,
  onWhatsAppClick,
  whatsappUrl,
  logoSrc,
  heroImageSrc,
  goldBarImageSrc,
  silverBarImageSrc,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation onWhatsAppClick={onWhatsAppClick} logoSrc={logoSrc} />
      <Hero onWhatsAppClick={onWhatsAppClick} heroImageSrc={heroImageSrc} />
      <PriceBar />
      <Catalog
        products={products}
        onWhatsAppClick={onWhatsAppClick}
        goldBarImageSrc={goldBarImageSrc}
        silverBarImageSrc={silverBarImageSrc}
      />
      <Benefits />
      <HowToBuy />
      <FAQ />
      <Footer
        onWhatsAppClick={onWhatsAppClick}
        whatsappUrl={whatsappUrl}
        logoSrc={logoSrc}
      />
    </div>
  );
};

export default IndexPage;
