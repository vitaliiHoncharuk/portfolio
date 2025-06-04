import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import FloatingFAQ from '@/components/ui/floating-faq';

// Optimized font loading with display swap for better performance
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'Vitalii Honcharuk | Senior React Developer',
  description: 'Senior React Developer with 5+ years of experience specializing in FinTech, performance optimization, and microfrontend architecture.',
  keywords: ['React', 'Developer', 'Vitalii Honcharuk', 'Frontend', 'TypeScript', 'FinTech', 'Performance'],
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://vitalii-portfolio.vercel.app' : 'http://localhost:3000'),
  openGraph: {
    title: 'Vitalii Honcharuk | Senior React Developer',
    description: 'Senior React Developer specializing in FinTech and performance optimization',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <FloatingFAQ />
        </ThemeProvider>
      </body>
    </html>
  );
}