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
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary group-hover:text-blue-500">
          {data.title}
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
        <p className="text-foreground mb-4">{data.summary}</p>
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
        <p className="text-foreground mb-2">{data.summary}</p>
      </div>
    </Link>
  );
}
