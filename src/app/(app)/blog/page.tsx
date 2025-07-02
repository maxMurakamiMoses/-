import BlogFilter from "@/components/blog-filter";
import { getAllPostsMetadataFromDB, getAllCategories } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog",
  description: `Latest news and updates from ${siteConfig.name}.`,
  openGraph: {
    title: "Blog",
    description: `Latest news and updates from ${siteConfig.name}.`,
    type: "website",
    url: `${siteConfig.url}/blog`,
  },
});

export default async function Blog() {
  const allPosts = await getAllPostsMetadataFromDB();
  const categories = await getAllCategories();

  return (
    <div className='bg-muted'>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${siteConfig.name} Blog`,
            description: `Latest news and updates from ${siteConfig.name}`,
            url: `${siteConfig.url}/blog`,
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            blogPost: allPosts.map((post: any) => ({
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.publishedAt,
              description: post.summary,
              url: `${siteConfig.url}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: post.author,
              },
            })),
          }),
        }}
      />
      <BlogFilter allPosts={allPosts} categories={categories} />
    </div>
  );
}
