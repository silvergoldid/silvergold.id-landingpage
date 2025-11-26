import React from "react";

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
