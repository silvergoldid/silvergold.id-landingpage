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

// Helper to parse weight string (e.g., "1.000 grams" -> 1000, "5 grams" -> 5)
export const parseWeight = (weightStr: string): number => {
  // Remove "grams", "gram", whitespace
  const cleanStr = weightStr
    .toLowerCase()
    .replace(/grams?|gram/g, "")
    .trim();

  // Handle Indonesian format: remove dots (thousand separator), replace comma with dot (decimal)
  // Check if it has dots but no commas (likely 1.000 format)
  if (cleanStr.includes(".") && !cleanStr.includes(",")) {
    // If it looks like "1.000" (1000), remove dots
    // But be careful with "1.5" (1.5) - standard JS float
    // Assumption: In this context, "1.000" is 1000g (1kg)
    // We'll remove dots if there are 3 digits after it, or just remove all dots if we assume ID format
    return parseFloat(cleanStr.replace(/\./g, ""));
  }

  // If it has comma, replace with dot
  if (cleanStr.includes(",")) {
    return parseFloat(cleanStr.replace(/\./g, "").replace(",", "."));
  }

  return parseFloat(cleanStr);
};
