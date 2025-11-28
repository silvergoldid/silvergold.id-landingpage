import IndexPage from "@/components/Main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Investasi emas dan perak fisik bersertifikat di Indonesia. Batangan emas 99.99% dan perak 99.9% dengan pengiriman aman, asuransi penuh, dan layanan buyback terpercaya.",
  openGraph: {
    description:
      "Investasi emas dan perak fisik bersertifikat di Indonesia. Batangan emas 99.99% dan perak 99.9% dengan pengiriman aman, asuransi penuh, dan layanan buyback terpercaya.",
  },
  twitter: {
    description:
      "Investasi emas dan perak fisik bersertifikat di Indonesia. Batangan emas 99.99% dan perak 99.9% dengan pengiriman aman, asuransi penuh, dan layanan buyback terpercaya.",
  },
};

export default function Home() {
  return <IndexPage />;
}
