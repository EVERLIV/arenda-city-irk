import type { MetadataRoute } from "next";
import { getAdvertisingTypes, getCategories } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/categories",
    "/catalog",
    "/advertising",
    "/about",
    "/manage",
    "/contacts",
    "/privacy",
    "/consent",
  ].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const categoryPages = getCategories().map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const adPages = getAdvertisingTypes().map((type) => ({
    url: `${baseUrl}/advertising/${type.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...adPages];
}
