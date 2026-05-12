export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const PARTNER_IMAGES: Record<string, string> = {
  "partner-zksm":    "/images/hero-bg.jpg",
  "partner-enc":     "/images/hero-bg.jpg",
  "partner-charis":  "/images/o-nas-possobenie-1.jpg",
  "partner-strapar": "/images/o-nas-possobenie-2.jpg",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.pageContent.findUnique({ where: { key: `partner-${slug}` } });
  if (!page) return { title: "Marana Tha" };
  return { title: `${page.title} | Partnerstvá | Marana Tha`, description: page.subtitle ?? "" };
}

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.pageContent.findUnique({ where: { key: `partner-${slug}` } });
  if (!page) notFound();

  const heroImage = page.coverImage ?? PARTNER_IMAGES[`partner-${slug}`] ?? "/images/hero-bg.jpg";

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(380px, 55vw, 600px)" }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
          <div className="absolute inset-0" style={{ backgroundColor: "#dec4b0", mixBlendMode: "color-burn" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1c1d1e 12%, transparent 60%, rgba(28,29,30,0.85) 100%)", mixBlendMode: "multiply" }} />

          <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-12 lg:px-[235px] pb-12 sm:pb-16"
            style={{ minHeight: "clamp(380px, 55vw, 600px)" }}>
            <div style={{ width: "clamp(120px,30vw,200px)", height: "1px", backgroundColor: "#bea055", marginBottom: "20px" }} />
            <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "11px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#bea055", display: "block", marginBottom: "12px" }}>
              Partnerstvá
            </span>
            <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, color: "#fdf5f2", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: "16px" }}>
              {page.title}
            </h1>
            {page.subtitle && (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(16px,2vw,20px)", color: "rgba(253,245,242,0.7)", maxWidth: "560px" }}>
                {page.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="px-4 sm:px-8 lg:px-[235px]">
            <div className="max-w-[760px]">
              {page.content && (
                <div
                  className="prose prose-lg max-w-none"
                  style={{ fontFamily: "var(--font-commissioner)", fontSize: "clamp(17px,2vw,20px)", lineHeight: 1.8, color: "#1c1d1e" }}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              )}

              <div style={{ height: "1px", backgroundColor: "#bea055", margin: "48px 0" }} />

              <Link href="/o-nas"
                className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#bea055" }}>
                ← Späť na O nás
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
