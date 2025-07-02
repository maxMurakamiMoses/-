import { getAllAuthors } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Authors",
  description: "List of all authors.",
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <section className="bg-black min-h-screen py-12">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Authors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {authors.map((author: any) => {
            const photo = typeof author.photo === 'string' && author.photo.startsWith('/') ? author.photo : '/profilepic.jpg';
            const alt = typeof author.name === 'string' ? author.name : 'Author';
            return (
              <Link
                key={author.id}
                href={`/author/${encodeURIComponent(author.name)}`}
                className="flex flex-col items-center bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition"
              >
                <Image
                  src={photo}
                  alt={alt}
                  width={80}
                  height={80}
                  className="rounded-full aspect-square object-cover border-2 border-gray-700 mb-4"
                />
                <span className="text-lg font-semibold text-white">{author.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 