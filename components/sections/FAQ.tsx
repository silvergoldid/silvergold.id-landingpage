import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
