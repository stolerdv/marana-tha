import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageContentForm } from "@/components/admin/PageContentForm";

const PAGE_META: Record<string, {
  label: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "image" | "richtext" }[];
  dataFields?: { key: string; label: string; type: "text" | "number" }[];
}> = {
  home: {
    label: "Hlavná stránka",
    fields: [
      { key: "title", label: "Hlavný nadpis (hero)", type: "text" },
      { key: "subtitle", label: "Podnadpis (hero)", type: "textarea" },
      { key: "coverImage", label: "Hero fotografia", type: "image" },
    ],
    dataFields: [
      { key: "countdownDate", label: "Dátum countdownu (formát: 2026-09-05)", type: "text" },
      { key: "ctaButton", label: "Text tlačidla", type: "text" },
    ],
  },
  "o-nas": {
    label: "O nás",
    fields: [
      { key: "title", label: "Nadpis sekcie", type: "text" },
      { key: "subtitle", label: "Úvodný text", type: "textarea" },
      { key: "content", label: "Podrobný text (formátovaný)", type: "richtext" },
      { key: "coverImage", label: "Hlavná fotografia", type: "image" },
    ],
    dataFields: [
      { key: "stat1Value", label: "Štatistika 1 — číslo", type: "number" },
      { key: "stat1Label", label: "Štatistika 1 — popis", type: "text" },
      { key: "stat2Value", label: "Štatistika 2 — číslo", type: "number" },
      { key: "stat2Label", label: "Štatistika 2 — popis", type: "text" },
      { key: "stat3Value", label: "Štatistika 3 — číslo", type: "number" },
      { key: "stat3Label", label: "Štatistika 3 — popis", type: "text" },
    ],
  },
  "kde-sme": {
    label: "Kde pôsobíme",
    fields: [
      { key: "title", label: "Nadpis", type: "text" },
      { key: "subtitle", label: "Úvodný text", type: "textarea" },
      { key: "coverImage", label: "Hero fotografia", type: "image" },
    ],
  },
  "pridaj-sa": {
    label: "Pridaj sa k nám",
    fields: [
      { key: "title", label: "Nadpis", type: "text" },
      { key: "subtitle", label: "Úvodný text", type: "textarea" },
      { key: "content", label: "Podrobný text (formátovaný)", type: "richtext" },
      { key: "coverImage", label: "Hero fotografia", type: "image" },
    ],
  },
  kontakt: {
    label: "Kontakt",
    fields: [
      { key: "title", label: "Nadpis", type: "text" },
      { key: "subtitle", label: "Podnadpis", type: "textarea" },
      { key: "coverImage", label: "Hero fotografia", type: "image" },
    ],
    dataFields: [
      { key: "presovAddress", label: "Adresa Prešov", type: "text" },
      { key: "presovPhone", label: "Telefón Prešov", type: "text" },
      { key: "presovEmail", label: "Email Prešov", type: "text" },
      { key: "bardejovAddress", label: "Adresa Bardejov", type: "text" },
      { key: "bardejovEmail", label: "Email Bardejov", type: "text" },
      { key: "kosiceAddress", label: "Adresa Košice", type: "text" },
      { key: "kosiceEmail", label: "Email Košice", type: "text" },
    ],
  },
  sluzby: {
    label: "Naša služba",
    fields: [
      { key: "title", label: "Nadpis", type: "text" },
      { key: "subtitle", label: "Popis pod nadpisom", type: "textarea" },
      { key: "coverImage", label: "Hero fotografia", type: "image" },
    ],
  },
};

export default async function EditPagePage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const meta = PAGE_META[key];
  if (!meta) notFound();

  const existing = await db.pageContent.findUnique({ where: { key } });

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/pages" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>
          ← Stránky
        </Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>
          {meta.label}
        </h1>
      </div>

      <PageContentForm
        pageKey={key}
        fields={meta.fields}
        dataFields={meta.dataFields}
        initial={existing ? {
          title: existing.title ?? "",
          subtitle: existing.subtitle ?? "",
          content: existing.content ?? "",
          coverImage: existing.coverImage ?? "",
          data: (existing.data as Record<string, string>) ?? {},
        } : undefined}
      />
    </div>
  );
}
