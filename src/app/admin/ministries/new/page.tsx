import { MinistryForm } from "@/components/admin/MinistryForm";
import Link from "next/link";

export default function NewMinistryPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/ministries" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Naša služba</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>Nová služba</h1>
      </div>
      <MinistryForm mode="create" />
    </div>
  );
}
