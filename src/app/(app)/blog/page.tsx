import BlogCard, { BlogCardNoImage, BlogStackedTitleCard } from "@/components/blog-card";
import { getAllPostsFromDB } from "@/lib/blog";
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
  const allPosts = await getAllPostsFromDB();

  // Separate posts by feature
  const mainFeature = allPosts.find((p: any) => p.feature === 'main_feature');
  const stackFeatures = allPosts.filter((p: any) => p.feature === 'stack_feature').slice(0, 3);
  const rest = allPosts.filter((p: any) =>
    p.feature !== 'main_feature' && p.feature !== 'stack_feature'
  );

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
      <div className="min-h-[50vh] backdrop-blur-lg">
        <div className="mx-auto w-full max-w-6xl px-10">
          <h2 className="text-2xl font-bold mb-6 pt-6">人気記事</h2>
          {/* Top section: 2 columns on lg+, stacked BlogCard on mobile */}
          {/* Mobile: all BlogCard stacked */}
          <div className="grid grid-cols-1 gap-8 mb-10 min-h-[500px] lg:hidden">
            {mainFeature && <BlogCard key={`${mainFeature.slug}-main`} data={mainFeature} priority />}
            {stackFeatures.map((data: any, idx: number) => (
              <BlogCard key={`${data.slug}-stack-${idx}`} data={data} priority={false} />
            ))}
          </div>
          {/* Desktop: special layout */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mb-10 min-h-[500px]">
            {/* Large card on the left */}
            <div className="h-full min-h-[500px]">
              {mainFeature && (
                <BlogCard key={`${mainFeature.slug}-main-lg`} data={mainFeature} priority />
              )}
            </div>
            {/* Three stacked cards on the right */}
            <div className="flex flex-col">
              {stackFeatures.map((data: any, idx: number) => (
                <BlogStackedTitleCard key={`${data.slug}-stack-lg-${idx}`} data={data} />
              ))}
            </div>
          </div>
          {/* Standard 3-column grid for the rest */}
          <h2 className="text-2xl font-bold mb-4">すべての記事</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {rest.map((data: any, idx: number) => (
              <BlogCard key={`${data.slug}-rest-${idx}`} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
