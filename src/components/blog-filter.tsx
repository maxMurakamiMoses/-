"use client";

import { useState, useMemo } from "react";
import BlogCard, { BlogCardNoImage, BlogStackedTitleCard } from "@/components/blog-card";
import CategoryFilter from "@/components/category-filter";
import { Post } from "@/lib/blog";

interface Category {
  name: string;
  count: number;
}

interface BlogFilterProps {
  allPosts: Post[];
  categories: Category[];
}

export default function BlogFilter({ allPosts, categories }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return allPosts;
    }
    return allPosts.filter((post) => post.category === selectedCategory);
  }, [allPosts, selectedCategory]);

  // Separate posts by feature for the featured sections
  const mainFeature = allPosts.find((p: any) => p.feature === 'main_feature');
  const stackFeatures = allPosts.filter((p: any) => p.feature === 'stack_feature').slice(0, 3);

  return (
    <div className="min-h-[50vh] backdrop-blur-lg">
      <div className="mx-auto w-full max-w-6xl px-10">
        <h2 className="text-2xl font-bold mb-6 pt-6">人気記事</h2>

        {/* Show message if no posts found */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No blog posts found in the selected category.
            </p>
          </div>
        )}

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
        
        {/* Category Filter - moved here */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {filteredPosts.map((data: any, idx: number) => (
            <BlogCard key={`${data.slug}-rest-${idx}`} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
} 