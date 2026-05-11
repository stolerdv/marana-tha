import type { Metadata } from "next";
import { Commissioner, Inter } from "next/font/google";
import "./globals.css";
import { PodporaButton } from "@/components/shared/PodporaButton";
import { PageLoader } from "@/components/shared/PageLoader";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marana Tha — Spoločenstvo",
  description:
    "Marana Tha je katolícke spoločenstvo v Prešove, Bardejove a Košiciach. Miesto stretnutí, modlitieb, chvál a evanjelizácie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${commissioner.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <PageLoader />
        {children}
        <PodporaButton />
      </body>
    </html>
  );
}
