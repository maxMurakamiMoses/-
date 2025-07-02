import Author from "@/components/blog-author";
import { CTA } from "@/components/sections/cta";
import { getPostFromDB } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPostFromDB(slug);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: canonicalUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  let post = await getPostFromDB(slug);
  if (!post) {
    notFound();
  }
  
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  
  return (
    <section id="blog" className="bg-black min-h-screen">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Link href="/blog" className="text-white hover:underline text-md font-medium flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            ブログに戻る
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteConfig.url}${post.metadata.image}`
              : `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
            url: canonicalUrl,
            author: {
              "@type": "Person",
              name: post.metadata.author,
              url: `${siteConfig.url}/author/${encodeURIComponent(post.metadata.author)}`,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          }),
        }}
      />
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8 space-y-4 my-12 text-white">
        <Suspense
          fallback={
            <div className="mb-8 w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          }
        >
          {post.metadata.image && (
            <div className="mb-8">
              <Image
                width={1920}
                height={1080}
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-auto rounded-lg border shadow-md"
              />
            </div>
          )}
        </Suspense>
        <div className="flex flex-col space-y-4">
          <h1 className="title font-bold text-3xl md:text-5xl tracking-tighter text-white leading-tight">
            {post.metadata.title}
          </h1>
          {post.metadata.summary && (
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {post.metadata.summary}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center text-sm text-white">
          <Suspense fallback={<p className="h-5" />}>
            <div className="flex items-center space-x-2">
              <time
                dateTime={post.metadata.publishedAt}
                className="text-sm text-white"
              >
                {formatDate(post.metadata.publishedAt)}
              </time>
            </div>
          </Suspense>
        </div>
        <div className="flex items-center space-x-2">
          <Author
            twitterUsername={post.metadata.authorTwitter || "anonymous"}
            name={post.metadata.author}
            image={post.metadata.authorImage || "/profilepic.jpg"}
            className="text-white"
          />
        </div>
        <article
          className="prose dark:prose-invert prose-[color:white] prose-a:text-white mx-auto max-w-full text-white"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </div>
      <CTA />
    </section>
  );
}
