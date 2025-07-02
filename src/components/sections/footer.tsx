import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Icons } from "@/components/icons";
import Image from "next/image";

interface Icon {
  icon: JSX.Element;
  url: string;
}

const icons: Icon[] = [
  { icon: <InstagramLogoIcon />, url: "https://www.instagram.com" },
  { icon: <LinkedInLogoIcon />, url: "https://www.linkedin.com" },
  { icon: <TwitterLogoIcon />, url: "https://www.twitter.com" },
];

type FooterLink = { id: number; title: string; url: string };

const footerLinks: FooterLink[][] = [
  [
    { id: 1, title: "オナサムライについて", url: "/#hero" },
    { id: 2, title: "お問い合わせ", url: "mailto:inquiry@オナサムライ.com" },
    { id: 3, title: "ブログ", url: "/blog" },
  ],
  [
    { id: 7, title: "サポート", url: "mailto:support@オナサムライ.com" },
    { id: 8, title: "プライバシーポリシー", url: "/privacy-policy" },
    { id: 9, title: "利用規約", url: "/terms" },
    { id: 6, title: "返金を希望する", url: "https://forms.gle/d5fUL28RaBfHJ91F9" },
  ],
  [
    { id: 10, title: "Instagram", url: "#" },
    { id: 11, title: "TikTok", url: "#" },
    { id: 12, title: "X（Twitter）", url: "#" },
    { id: 13, title: "アフィリエイト募集", url: "https://forms.gle/A7XNcsjbwFoa6mZ56" },
  ],
];

export function Footer() {
  return (
    <footer className="px-7 md:px-10 max-w-6xl mx-auto">
      <div className="flex flex-col py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start justify-start gap-y-5">
          <a href="#" className="flex items-center gap-x-2.5">
          <div className="z-10 mx-auto size-10 lg:size-12 rounded-[1rem] border p-3 shadow-2xl backdrop-blur-md bg-black/10">
            <Icons.logo className="w-auto h-full" />
          </div>
            <h1 className="text-xl font-bold text-white">
            オナサムライ
            </h1>
          </a>
          <p className="tracking-tight text-white">
          ポルノ卒業の最強アプリ。
          </p>
          <p className="text-sm tracking-tight text-neutral-400 sm:text-center">
            All rights reserved.
          </p>
        </div>
        <div className="pt-5 md:w-2/3">
          <div className="flex flex-col gap-y-8 md:flex-row md:items-start md:justify-between md:gap-x-8 lg:pl-10">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col items-start gap-y-3 min-w-[140px]">
                {column.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-neutral-400 hover:text-neutral-200 whitespace-nowrap"
                  >
                    <a href={link.url}>{link.title}</a>
                    <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-10 border-t border-dashed py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-x-2">
          <Image
            className="cursor-pointer rounded-md border border-neutral-700"
            src="https://cdn.magicui.design/playstore-download.png"
            alt="Download on Google Play Store"
            width={120}
            height={40}
          />
          <Image
            className="cursor-pointer rounded-md border border-neutral-700"
            src="https://cdn.magicui.design/ios-download.png"
            alt="Download on Apple App Store"
            width={120}
            height={40}
          />
        </div>

       
      </div>
    </footer>
  );
}
