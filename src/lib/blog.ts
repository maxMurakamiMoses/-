import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/config";

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  author: string;
  slug: string;
  image?: string;
  authorImage?: string;
  metadata: string; // SEO sentence
  content: string;
};

// Hardcoded fallback values
const HARDCODED_AUTHOR = "クイッター編集部";
const HARDCODED_IMAGE = "/profilepic.jpg";

export async function getPost(slug: string) {
  // Slug is the title lowercased and hyphenated
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const post = await prisma.blogPost.findFirst({
    where: { title },
  });
  if (!post) return null;
  return {
    source: post.content || "",
    metadata: {
      title: post.title,
      publishedAt: post.publishDate.toISOString(),
      summary: post.metadata || "",
      author: post.author || HARDCODED_AUTHOR,
      image: post.image || HARDCODED_IMAGE,
      metadata: post.metadata || "",
    },
    slug,
  };
}

export async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishDate: "desc" },
  });
  return posts.map((post) => {
    // Create slug from title
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    return {
      title: post.title,
      publishedAt: post.publishDate.toISOString(),
      summary: post.metadata || "",
      author: post.author || HARDCODED_AUTHOR,
      slug,
      image: post.image || HARDCODED_IMAGE,
      metadata: post.metadata || "",
      content: post.content || "",
    };
  });
}
