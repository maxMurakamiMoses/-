import { getAuthorByName } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    name: string;
  }>;
}): Promise<Metadata | undefined> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const author = await getAuthorByName(decodedName);
  
  if (!author) {
    return {
      title: "Author Not Found",
      description: "The requested author could not be found.",
    };
  }

  return {
    title: `${author.name} - Author`,
    description: author.bio || 'Author profile',
    openGraph: {
      title: `${author.name} - Author`,
      description: author.bio || 'Author profile',
      type: "profile",
      images: author.photo ? [
        {
          url: author.photo,
        },
      ] : [],
    },
    twitter: {
      card: "summary",
      title: `${author.name} - Author`,
      description: author.bio || 'Author profile',
      images: author.photo ? [author.photo] : [],
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{
    name: string;
  }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const author = await getAuthorByName(decodedName);
  
  if (!author) {
    notFound();
  }

  return (
    <section className="bg-black min-h-screen">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Link href="/blog" className="text-white hover:underline text-md font-medium flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            ブログに戻る
          </Link>
        </div>
      </div>
      
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8 space-y-8 my-12 text-white">
        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden border-4 border-gray-800 bg-gray-900 flex-shrink-0">
            <Image
              src={author.photo || '/profilepic.jpg'}
              alt={author.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {author.name}
            </h1>
            <div className="space-y-1 mt-2">
              <h2 className="text-xl font-semibold text-white">About</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 