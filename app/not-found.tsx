"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold leading-none">
            <span className="text-gradient-gold">4</span>
            <span className="text-gradient-silver">0</span>
            <span className="text-gradient-gold">4</span>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-silver/20 blur-3xl -z-10" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            Silakan kembali ke beranda atau hubungi kami jika Anda memerlukan
            bantuan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-gold hover:bg-gold-dark text-primary-foreground font-medium transition-all duration-300 glow-gold"
          >
            <Home className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
          <a
            href="https://wa.me/6285110328180"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md border border-gold text-gold hover:bg-gold hover:text-primary-foreground font-medium transition-all duration-300"
          >
            <Search className="h-5 w-5" />
            Hubungi Kami
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Mungkin Anda sedang mencari:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="/#catalog"
              className="text-gold hover:text-gold-dark transition-colors"
            >
              Katalog Produk
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/#how-to-buy"
              className="text-gold hover:text-gold-dark transition-colors"
            >
              Cara Membeli
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/#faq"
              className="text-gold hover:text-gold-dark transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
