import BlogCard, { BlogCardNoImage, BlogStackedTitleCard } from "@/components/blog-card";
import { getAllPostsFromDB } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog",
  description: `Latest news and updates from ${siteConfig.name}.`,
});

export default async function Blog() {
  const allPosts = await getAllPostsFromDB();

  const articles = allPosts.sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className='bg-muted'>
      <div className="min-h-[50vh] backdrop-blur-lg">
        <div className="mx-auto w-full max-w-6xl px-10">
          <h2 className="text-2xl font-bold mb-6 pt-6">人気記事</h2>
          {/* Top section: 2 columns on lg+, stacked BlogCard on mobile */}
          {/* Mobile: all BlogCard stacked */}
          <div className="grid grid-cols-1 gap-8 mb-10 min-h-[500px] lg:hidden">
            {articles.slice(0, 4).map((data: any, idx: number) => (
              <BlogCard key={`${data.slug}-${idx}`} data={data} priority={idx === 0} />
            ))}
          </div>
          {/* Desktop: special layout */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mb-10 min-h-[500px]">
            {/* Large card on the left */}
            <div className="h-full min-h-[500px]">
              {articles[0] && (
                <BlogCard key={`${articles[0].slug}-0`} data={articles[0]} priority />
              )}
            </div>
            {/* Three stacked cards on the right */}
            <div className="flex flex-col">
              {articles[1] && (
                <BlogStackedTitleCard key={`${articles[1].slug}-1`} data={articles[1]} />
              )}
              {articles[2] && (
                <BlogStackedTitleCard key={`${articles[2].slug}-2`} data={articles[2]} />
              )}
              {articles[3] && (
                <BlogStackedTitleCard key={`${articles[3].slug}-3`} data={articles[3]} />
              )}
            </div>
          </div>
          {/* Standard 3-column grid for the rest */}
          <h2 className="text-2xl font-bold mb-4">すべての記事</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {articles.slice(4).map((data: any, idx: number) => (
              <BlogCard key={`${data.slug}-${idx + 4}`} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
