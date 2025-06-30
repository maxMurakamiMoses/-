import { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BlogCard({
  data,
  priority,
}: {
  data: Post;
  priority?: boolean;
}) {
  return (
    <Link href={`/blog/${data.slug}`} className="block group">
      <div className={`bg-background rounded-lg p-4 mb-4 border hover:shadow-sm transition-shadow duration-200${priority ? ' min-h-[470px]' : ''}`}>
        {data.image && (
          <Image
            className="rounded-t-lg object-cover border"
            src={data.image}
            width={1200}
            height={630}
            alt={data.title}
            priority={priority}
          />
        )}
        {!data.image && <div className="bg-gray-200 h-[180px] mb-4 rounded" />}
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className="text-xl font-semibold mb-2 flex items-center transition-colors group-hover:text-primary group-hover:text-blue-500">
          {data.title}
          <ChevronRight className="ml-2 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-blue-500" />
        </h3>
        <p className="text-foreground mb-4">{data.summary}</p>
      </div>
    </Link>
  );
}

// Card that shows all info except the image
export function BlogCardNoImage({ data }: { data: Post }) {
  return (
    <Link href={`/blog/${data.slug}`} className="block h-full">
      <div className="bg-background rounded-lg p-4 border hover:shadow-sm transition-shadow duration-200 h-full flex flex-col justify-center">
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
        <p className="text-foreground mb-4">{data.summary}</p>
      </div>
    </Link>
  );
}

// Stacked title card: no card background, just text, chevron appears on hover
export function BlogStackedTitleCard({ data }: { data: Post }) {
  return (
    <Link href={`/blog/${data.slug}`} className="group block h-full cursor-pointer select-none">
      <div className="p-4">
        <p className="mb-2">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <div className="flex items-center">
          <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-blue-500 flex items-center">
            {data.title}
            <ChevronRight className="ml-2 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-blue-500" />
          </h3>
        </div>
        <p className="text-foreground">{data.summary}</p>
      </div>
    </Link>
  );
}
