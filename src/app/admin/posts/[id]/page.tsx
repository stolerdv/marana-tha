import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import Link from "next/link";
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/posts" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>← Blog</Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>{post.title}</h1>
      </div>
      <PostForm mode="edit" postId={post.id} initial={{ title: post.title, slug: post.slug, content: post.content, excerpt: post.excerpt ?? "", coverImage: post.coverImage ?? "", published: post.published }} />
    </div>
  );
}
