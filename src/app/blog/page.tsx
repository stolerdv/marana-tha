export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";

export const metadata = {
  title: "Blog | Marana Tha",
  description: "Čítaj novinky, zamyslenia a príbehy zo spoločenstva Marana Tha.",
};

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, createdAt: true },
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Blog"
          description="Čítaj novinky, zamyslenia a príbehy zo spoločenstva Marana Tha."
          image="/images/blog-hero.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>

            <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
              Články
            </p>

            {posts.length === 0 ? (
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
                Čoskoro budú pridané nové články.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group"
                    style={{ borderRadius: "15px", overflow: "hidden", backgroundColor: "#ffffff", display: "block" }}
                  >
                    {/* Cover image */}
                    <div className="relative overflow-hidden" style={{ height: "220px", backgroundColor: "#e6ded5" }}>
                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: "20px 24px 24px" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#977d3e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {new Date(post.createdAt).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <h2 style={{ fontFamily: "var(--font-commissioner)", fontSize: "22px", fontWeight: 700, color: "#1c1d1e", lineHeight: "1.3", marginBottom: "10px" }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#635f5b", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {post.excerpt}
                        </p>
                      )}
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#bea055", marginTop: "12px" }}>
                        Čítať viac →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <ZistitViac />
      </main>
      <Footer />
    </>
  );
}
