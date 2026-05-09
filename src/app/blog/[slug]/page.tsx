import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug, published: true }, select: { title: true, excerpt: true } });
  if (!post) return { title: "Marana Tha" };
  return { title: `${post.title} | Marana Tha`, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHero title={post.title} description={post.excerpt ?? ""} image={post.coverImage ?? "/images/blog-hero.jpg"} titleTop={467} />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            {/* Date */}
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", marginBottom: "32px" }}>
              {new Date(post.createdAt).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
            </p>

            {/* Content */}
            <div
              className="prose max-w-none"
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#1c1d1e", lineHeight: "1.7" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>
        <ZistitViac />
      </main>
      <Footer />
    </>
  );
}
