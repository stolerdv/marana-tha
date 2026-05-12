import { PartnerForm } from "@/components/admin/PartnerForm";
import Link from "next/link";

export default function NewPartnerPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/partnerstva" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055" }}>← Partnerstvá</Link>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Nové partnerstvo</h1>
      </div>
      <PartnerForm mode="create" />
    </div>
  );
}
