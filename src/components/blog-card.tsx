import { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  data,
  priority,
}: {
  data: Post;
  priority?: boolean;
}) {
  return (
    <Link href={`/blog/${data.slug}`} className="block group">
      <div className={`bg-background rounded-lg p-4 mb-4 border hover:shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02]${priority ? ' min-h-[470px]' : ''}`}>
        {data.image && (
          <div className="relative w-full h-[180px] mb-4">
            <Image
              className="rounded-t-lg object-cover border"
              src={data.image}
              alt={data.title}
              priority={priority}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {!data.image && (
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-[180px] mb-4 rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary group-hover:text-blue-500">
          {data.title}
        </h3>
        <p className="text-foreground mb-4 line-clamp-3">{data.summary}</p>
      </div>
    </Link>
  );
}

// Card that shows all info except the image
export function BlogCardNoImage({ data }: { data: Post }) {
  return (
    <Link href={`/blog/${data.slug}`} className="block h-full">
      <div className="bg-background rounded-lg p-4 border hover:shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] h-full flex flex-col justify-center">
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
export function BlogStackedTitleCard({ data }: { data: Post }) {
  return (
    <Link href={`/blog/${data.slug}`} className="group block h-full cursor-pointer select-none">
      <div className="p-4 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
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
