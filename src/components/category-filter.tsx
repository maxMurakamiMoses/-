"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="transition-all duration-200"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={selectedCategory === category.name ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.name)}
          className="transition-all duration-200"
        >
          {category.name}
          <span className="ml-1 text-xs opacity-70">({category.count})</span>
        </Button>
      ))}
    </div>
  );
} 