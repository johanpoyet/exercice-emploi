import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEV — Offres d'emploi",
  description: "Trouvez les meilleures offres d'emploi tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f0ede8]">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
