import { MissionForm } from "@/components/admin/MissionForm";
import Link from "next/link";

export default function NewMisiePage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/misie" style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055" }}>
          ← Misie
        </Link>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>
          Nová misia
        </h1>
      </div>
      <MissionForm mode="create" />
    </div>
  );
}
