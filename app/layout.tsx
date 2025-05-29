import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Vitalii Honcharuk - Senior React Developer",
  description: "Senior React Developer with 5+ years crafting performant, scalable solutions for FinTech leaders. Specialized in microfrontend architecture and performance optimization.",
  keywords: ["React", "TypeScript", "FinTech", "Developer", "Portfolio", "Senior Developer"],
  authors: [{ name: "Vitalii Honcharuk" }],
  openGraph: {
    title: "Vitalii Honcharuk - Senior React Developer",
    description: "Senior React Developer with 5+ years crafting performant, scalable solutions for FinTech leaders.",
    type: "website",
    locale: "en_US",
    url: "https://vitaliihoncharuk.com",
    siteName: "Vitalii Honcharuk Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Honcharuk - Senior React Developer",
    description: "Senior React Developer with 5+ years crafting performant, scalable solutions for FinTech leaders.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
