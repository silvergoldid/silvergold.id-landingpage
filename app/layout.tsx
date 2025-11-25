import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://silvergold.id";
const siteName = "silvergold.id";
const siteDescription =
  "Investasi emas dan perak fisik bersertifikat di Indonesia. Batangan emas 99.99% dan perak 99.9% dengan pengiriman aman, asuransi penuh, dan layanan buyback terpercaya.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "silvergold.id - Investasi Emas & Perak Bersertifikat Indonesia",
    template: "%s | silvergold.id",
  },
  description: siteDescription,
  keywords: [
    "investasi emas",
    "investasi perak",
    "batangan emas",
    "batangan perak",
    "emas bersertifikat",
    "perak bersertifikat",
    "jual emas",
    "jual perak",
    "logam mulia",
    "investasi logam mulia Indonesia",
  ],
  authors: [{ name: "silvergold.id" }],
  creator: "silvergold.id",
  publisher: "silvergold.id",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: siteName,
    title: "silvergold.id - Investasi Emas & Perak Bersertifikat Indonesia",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "silvergold.id - Investasi Emas & Perak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "silvergold.id - Investasi Emas & Perak Bersertifikat",
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // google: "your-google-verification-code", // Add when available
    // yandex: "your-yandex-verification-code", // Add when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-851-1032-8180",
      contactType: "Customer Service",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
    sameAs: [
      // Add social media links when available
      // "https://www.facebook.com/silvergold.id",
      // "https://www.instagram.com/silvergold.id",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Indonesia",
    },
  };

  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}

        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </body>
    </html>
  );
}
