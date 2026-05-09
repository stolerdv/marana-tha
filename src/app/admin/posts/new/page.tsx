import { PostForm } from "@/components/admin/PostForm";
import Link from "next/link";
export default function NewPostPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/posts" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Blog</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>Nový príspevok</h1>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
