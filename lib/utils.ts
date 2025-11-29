import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class name merger utility
 * Combines clsx and tailwind-merge for optimal className handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleWhatsAppClick = (data: string | null) => {
  const phoneNumber = "6285110328180";
  window.open(
    data
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(data)}`
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          "Halo kak, saya tertarik dan mau konsultasi untuk pembelian emas/perak"
        )}`,
    "_blank"
  );
};

export const formatRupiah = (value: string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
};
