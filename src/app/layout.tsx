import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "AlugarAP",
  description: "Plataforma para alugar ou anunciar imóveis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 h-full`}
      >
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Header />

            {/* Conteúdo principal com flex-grow para empurrar o footer */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
              {children}
            </main>

            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
