import { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  data,
  priority,
  showCategory = true,
  size = "normal",
}: {
  data: Post;
  priority?: boolean;
  showCategory?: boolean;
  size?: "normal" | "large";
}) {
  const isLarge = size === "large";
  
  return (
    <Link href={`/blog/${data.slug}`} className="block group">
      <div className={`bg-background rounded-lg p-4 mb-4 border hover:shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02]${priority ? ' min-h-[470px]' : ''}`}>
        <div className={`relative w-full mb-4 ${isLarge ? 'h-[280px]' : 'h-[180px]'}`}>
          <Image
            className="rounded-t-lg object-cover border"
            src="/introducing.png"
            alt="Blog post image"
            priority={priority}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {showCategory && data.category && (
          <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
            {data.category}
          </span>
        )}
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className={`font-semibold mb-2 transition-colors group-hover:text-primary group-hover:text-blue-500 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          {data.title}
        </h3>
        <p className="text-foreground mb-4 line-clamp-3">{data.summary}</p>
      </div>
    </Link>
  );
}

// Card that shows all info except the image
export function BlogCardNoImage({ 
  data, 
  showCategory = true 
}: { 
  data: Post;
  showCategory?: boolean;
}) {
  return (
    <Link href={`/blog/${data.slug}`} className="block h-full">
      <div className="bg-background rounded-lg p-4 border hover:shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] h-full flex flex-col justify-center">
        {showCategory && data.category && (
          <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
            {data.category}
          </span>
        )}
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
        <p className="text-foreground mb-4 line-clamp-3">{data.summary}</p>
      </div>
    </Link>
  );
}

// Stacked title card: no card background, just text, expands on hover
export function BlogStackedTitleCard({ 
  data, 
  showCategory = true 
}: { 
  data: Post;
  showCategory?: boolean;
}) {
  return (
    <Link href={`/blog/${data.slug}`} className="group block h-full cursor-pointer select-none">
      <div className="p-4 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
        {showCategory && data.category && (
          <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
            {data.category}
          </span>
        )}
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <div className="flex items-center">
          <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-blue-500">
            {data.title}
          </h3>
        </div>
        <p className="text-foreground mb-2 line-clamp-2">{data.summary}</p>
      </div>
    </Link>
  );
}
