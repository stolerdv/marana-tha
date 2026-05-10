export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Blog</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>{posts.length} príspevkov</p>
        </div>
        <Link href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2" }}>
          + Nový príspevok
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadne príspevky</p>
          <Link href="/admin/posts/new" className="inline-block mt-4" style={{ color: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px" }}>Vytvor prvý →</Link>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "1fr 140px 100px 120px" }}>
            {["Názov", "Dátum", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {posts.map((post) => (
              <div key={post.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "1fr 140px 100px 120px" }}>
                <div>
                  <Link href={`/admin/posts/${post.id}`} className="hover:text-[#bea055] transition-colors"
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>{post.title}</Link>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>/{post.slug}</p>
                </div>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#292929" }}>
                  {new Date(post.createdAt).toLocaleDateString("sk-SK", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: post.published ? "#dcfce7" : "#f3f4f6", color: post.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500 }}>
                  {post.published ? "Online" : "Draft"}
                </span>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/posts/${post.id}`} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>Upraviť</Link>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
