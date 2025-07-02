import { siteConfig } from "@/lib/config";
import fs from "fs";
import path from "path";
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
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Post> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Post] = value;
  });

  return { data: metadata as Post, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

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

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = parseFrontmatter(source);
  const content = await markdownToHTML(rawContent);
  const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    metadata.title
  )}`;
  return {
    source: content,
    metadata: {
      ...metadata,
      image: metadata.image || defaultImage,
    },
    slug,
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);
      return {
        ...metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}

export async function getPostFromDB(slug: string) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        id: slug,
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
      },
      slug: post.id,
    };
  } catch (error) {
    console.error('Error fetching post from database:', error);
    return null;
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
        slug: post.id,
        content: processedContent,
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

    if (!author) {
      return null;
    }

    return {
      id: author.id,
      name: author.name,
      twitter: author.twitter,
      photo: author.photo || '/profilepic.jpg',
      bio: author.bio || 'No bio available.',
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching author from database:', error);
    return null;
  }
}

export async function getAllAuthors() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        _count: {
          select: {
            blogPosts: true
          }
        }
      }
    });

    return authors.map((author: any) => ({
      id: author.id,
      name: author.name,
      twitter: author.twitter,
      photo: author.photo || '/profilepic.jpg',
      bio: author.bio,
      postCount: author._count.blogPosts,
    }));
  } catch (error) {
    console.error('Error fetching authors from database:', error);
    return [];
  }
}
