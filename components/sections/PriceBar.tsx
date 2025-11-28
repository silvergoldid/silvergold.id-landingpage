import React from "react";
import { type MarketPrice } from "./Catalog";
import { formatRupiah } from "../utils/rupiah";

interface PriceBarProps {
  marketPrice: MarketPrice;
}

export const PriceBar: React.FC<PriceBarProps> = ({ marketPrice }) => {
  return (
    <div className="bg-charcoal border-t border-b border-gold/30 py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-sm md:text-base text-foreground">
              Update Harga Hari Ini
            </span>
            <div className="flex gap-4 text-xs md:text-sm">
              <span className="text-gold">
                ● Emas{" "}
                {marketPrice.gold_price ? (
                  formatRupiah(marketPrice.gold_price)
                ) : (
                  <span className="inline-block h-4 w-24 bg-gold/20 animate-pulse rounded"></span>
                )}
              </span>
              <span className="text-silver">
                ● Perak{" "}
                {marketPrice.silver_price ? (
                  formatRupiah(marketPrice.silver_price)
                ) : (
                  <span className="inline-block h-4 w-24 bg-silver/20 animate-pulse rounded"></span>
                )}
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground text-center md:text-right">
            *Harga final dikonfirmasi saat transaksi melalui WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};
