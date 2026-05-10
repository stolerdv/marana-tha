import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = "https://maranatha.sk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/o-nas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kde-sme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/spolocenstvo/presov`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/spolocenstvo/bardejov`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/spolocenstvo/kosice`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/sluzby`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ludia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/aktivity`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/udalosti`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/udalosti/vecer-chval`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pridaj-sa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/media/podcasty`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/media/archiv`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const [events, ministries, posts] = await Promise.all([
    db.event.findMany({ where: { published: true }, select: { slug: true, createdAt: true, isEveningOfPraise: true } }).catch(() => []),
    db.ministry.findMany({ where: { published: true }, select: { slug: true, createdAt: true } }).catch(() => []),
    db.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }).catch(() => []),
  ]);

  const eventRoutes: MetadataRoute.Sitemap = events
    .filter((e) => !e.isEveningOfPraise)
    .map((e) => ({
      url: `${BASE_URL}/udalosti/${e.slug}`,
      lastModified: e.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const ministryRoutes: MetadataRoute.Sitemap = ministries.map((m) => ({
    url: `${BASE_URL}/sluzby/${m.slug}`,
    lastModified: m.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes, ...ministryRoutes, ...postRoutes];
}
