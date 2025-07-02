import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getAllPostsMetadataFromDB, getAllAuthors } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  let domain = headersList.get("host") as string;
  let protocol = "https";

  // Get all published blog posts
  const posts = await getAllPostsMetadataFromDB();
  
  // Get all authors
  const authors = await getAllAuthors();

  const baseUrl = `${protocol}://${domain}`;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Blog post pages
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Author pages
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/author/${encodeURIComponent(author.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...blogPages, ...authorPages];
}
