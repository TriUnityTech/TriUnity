import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "TriUnity | Tecnologia de ponta para o seu negócio",
  description:
    "Infraestrutura de TI, redes Wi-Fi empresariais e para eventos, cabeamento estruturado, suporte on/offsourcing, consultoria personalizada, BI e venda de equipamentos de informática.",
  keywords: [
    "Infraestrutura de TI",
    "Redes Wi-Fi empresarial",
    "Cabeamento estruturado",
    "Wi-Fi para eventos",
    "Suporte de TI",
    "Outsourcing de TI",
    "Consultoria de TI",
    "BI e KPI",
    "Venda de equipamentos de informática",
    "TriUnity",
  ],
  openGraph: {
    title: "TriUnity | Tecnologia de ponta para o seu negócio",
    description:
      "Infraestrutura de TI, redes corporativas, suporte on/offsourcing, consultoria personalizada, BI e venda de equipamentos.",
    url: "https://triunity.com.br",
    siteName: "TriUnity",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "TriUnity Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TriUnity | Tecnologia de ponta",
    description:
      "Infraestrutura de TI, redes corporativas, suporte e consultoria para o seu negócio.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://triunity.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="96x96" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
