"use client";

import Link from "next/link";
import { Home, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleWhatsAppClick } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-silver/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        {/* 404 Number with Enhanced Styling */}
        <div className="relative mb-8">
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[14rem] font-bold leading-none select-none">
            <span className="inline-block text-gradient-gold animate-in fade-in slide-in-from-left-10 duration-700">
              4
            </span>
            <span className="inline-block text-gradient-silver animate-in fade-in zoom-in-50 duration-700 delay-150">
              0
            </span>
            <span className="inline-block text-gradient-gold animate-in fade-in slide-in-from-right-10 duration-700 delay-300">
              4
            </span>
          </h1>
          {/* Glowing Background Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-silver/20 to-gold/20 blur-3xl opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Message with Fade-in Animation */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            Silakan kembali ke beranda atau hubungi kami jika Anda memerlukan
            bantuan.
          </p>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 px-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-primary-foreground font-semibold transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
            >
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-gold text-gold hover:bg-gold hover:text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => handleWhatsAppClick("Halo kak, saya butuh bantuan")}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Hubungi Kami
          </Button>
        </div>

        {/* Enhanced Quick Links Section */}
        <div className="pt-12 border-t border-border/50 animate-in fade-in duration-1000 delay-1000">
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 font-medium">
            Mungkin Anda sedang mencari:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Link
              href="/catalogue"
              className="group p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-gold/5 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="h-6 w-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                Katalog Produk
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Lihat semua produk
              </p>
            </Link>
            <Link
              href="/#how-to-buy"
              className="group p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-gold/5 transition-all duration-300 hover:scale-105"
            >
              <Search className="h-6 w-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                Cara Membeli
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Panduan pembelian
              </p>
            </Link>
            <Link
              href="/#faq"
              className="group p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-gold/5 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-6 w-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                FAQ
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Pertanyaan umum
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
