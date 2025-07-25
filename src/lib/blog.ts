import { siteConfig } from "@/lib/config";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import prisma from "./prisma";

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  author: string;
  slug: string;
  image?: string;
  authorImage?: string;
  authorTwitter?: string;
  content?: string; // Processed HTML content from MDX
  category?: string;
};

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPostFromDB(title: string) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        title: title,
        isPublished: true
      },
      include: {
        author: true
      }
    });

    if (!post) {
      return null;
    }

    const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}`;
    
    // Process the content through MDX pipeline if it exists
    let processedContent = '';
    if (post.content) {
      try {
        processedContent = await markdownToHTML(post.content);
      } catch (error) {
        console.error('Error processing MDX content:', error);
        // Fallback to raw content if processing fails
        processedContent = post.content;
      }
    }
    
    return {
      source: processedContent,
      metadata: {
        title: post.title,
        publishedAt: post.publishDate.toISOString(),
        summary: post.subtitle || '',
        author: post.author?.name || 'Anonymous',
        image: post.coverImage || defaultImage,
        authorImage: post.author?.photo || '/profilepic.jpg',
        authorTwitter: post.author?.twitter || 'anonymous',
        category: post.category || '',
      },
      slug: post.title,
    };
  } catch (error) {
    console.error('Error fetching post from database:', error);
    return null;
  }
}

export async function getAllPostsMetadataFromDB() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      include: {
        author: true
      },
      orderBy: {
        publishDate: 'desc'
      }
    });

    return posts.map((post: any) => {
      const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}`;
      
      return {
        title: post.title,
        publishedAt: post.publishDate.toISOString(),
        summary: post.subtitle || '',
        author: post.author?.name || 'Anonymous',
        image: post.coverImage || defaultImage,
        authorImage: post.author?.photo || '/profilepic.jpg',
        authorTwitter: post.author?.twitter || 'anonymous',
        slug: post.title,
        feature: post.feature,
        category: post.category || '',
      };
    });
  } catch (error) {
    console.error('Error fetching posts metadata from database:', error);
    return [];
  }
}

export async function getAllPostsFromDB() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      include: {
        author: true
      },
      orderBy: {
        publishDate: 'desc'
      }
    });

    return await Promise.all(posts.map(async (post: any) => {
      const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}`;
      
      // Process the content through MDX pipeline if it exists
      let processedContent = '';
      if (post.content) {
        try {
          processedContent = await markdownToHTML(post.content);
        } catch (error) {
          console.error('Error processing MDX content:', error);
          // Fallback to raw content if processing fails
          processedContent = post.content;
        }
      }
      
      return {
        title: post.title,
        publishedAt: post.publishDate.toISOString(),
        summary: post.subtitle || '',
        author: post.author?.name || 'Anonymous',
        image: post.coverImage || defaultImage,
        authorImage: post.author?.photo || '/profilepic.jpg',
        authorTwitter: post.author?.twitter || 'anonymous',
        slug: post.title,
        content: processedContent,
        feature: post.feature,
        category: post.category || '',
      };
    }));
  } catch (error) {
    console.error('Error fetching posts from database:', error);
    return [];
  }
}

export async function getAuthorByName(name: string) {
  try {
    const author = await prisma.author.findFirst({
      where: {
        name: name
      }
    });
    return author;
  } catch (error) {
    console.error('Error fetching author from database:', error);
    return null;
  }
}

export async function getAllAuthors() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return authors;
  } catch (error) {
    console.error('Error fetching authors from database:', error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.blogPost.groupBy({
      by: ['category'],
      where: {
        isPublished: true,
        category: {
          not: null
        }
      },
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });

    return categories
      .filter(cat => cat.category && cat.category.trim() !== '')
      .map(cat => ({
        name: cat.category!,
        count: cat._count.category
      }));
  } catch (error) {
    console.error('Error fetching categories from database:', error);
    return [];
  }
}
