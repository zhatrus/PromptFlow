import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Prompt Guide — Посібник з форматування промптів",
  description: "Інтерактивний довідник з форматування промптів для роботи з ШІ. Курс, хелпери, бібліотека промптів.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prompt Guide",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background flex flex-col`}
      >
        <Header />
        <main className="flex-1 container max-w-5xl mx-auto py-6 px-4">{children}</main>
        <footer className="border-t py-4 mt-auto">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
            <div>Prompt Guide v1.0.0</div>
            <div>Оновлено: 3 лютого 2025</div>
          </div>
        </footer>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
