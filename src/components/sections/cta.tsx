import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const reviews = [
  {
    name: "佐藤 翔太",
    body: "誘惑に勝てるようになり、生活の質が上がりました。",
    img: "https://avatar.vercel.sh/satou",
  },
  {
    name: "鈴木 蓮",
    body: "無理なく続けられて、やめる決意が強まりました。",
    img: "https://avatar.vercel.sh/suzuki",
  },
  {
    name: "高橋 大輔",
    body: "助けがあって自信を持って前に進めています。",
    img: "https://avatar.vercel.sh/takahashi",
  },
  {
    name: "中村 駿",
    body: "生活リズムが整い、依存から解放できました。",
    img: "https://avatar.vercel.sh/nakamura",
  },
  {
    name: "山本 健",
    body: "習慣が変わり、毎日が充実しています。",
    img: "https://avatar.vercel.sh/yamamoto",
  },
  {
    name: "井上 剛",
    body: "機能がわかりやすく、続けやすいです。",
    img: "https://avatar.vercel.sh/inoue",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // dark styles (now applied normally)
        "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={32} height={32} alt={`${name}'s profile picture`} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CTA() {
  return (
    <section id="cta">
      <div className="py-14 container mx-auto px-4 max-w-[1100px] ">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
          <div className="absolute rotate-[35deg]">
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
          </div>
          <div className="z-10 mx-auto size-24 rounded-[2rem] border p-3 shadow-2xl backdrop-blur-md bg-black/10 lg:size-32">
            <Icons.logo className="w-auto h-full" />
          </div>
          <div className="z-10 mt-4 flex flex-col items-center text-center text-white">
            <h1 className="text-3xl font-bold lg:text-4xl">
            ついにやめる準備できた？
            </h1>
            <p className="mt-2 max-w-lg">刀に頼らず己を鍛えよ</p>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-8 text-white rounded-full group mt-4"
              )}
            >
              Download
              <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-70% to-black" />
        </div>
      </div>
    </section>
  );
}
