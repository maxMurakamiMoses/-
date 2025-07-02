import { BellIcon, Share2Icon, ZapIcon, TargetIcon, ShieldIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedListDemo } from "@/components/magicui/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: ZapIcon,
    name: "パニックボタン",
    description: "衝動を感じたときにすぐ使えるリアルタイムボタン。気持ちを落ち着かせて、コントロールを取り戻す手助けをします。",
    className: "col-span-3 lg:col-span-1",
    background: (
      // <Marquee
      //   pauseOnHover
      //   className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      // >
      //   {files.map((f, idx) => (
      //     <figure
      //       key={idx}
      //       className={cn(
      //         "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
      //         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      //         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      //         "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //       )}
      //     >
      //       <div className="flex flex-row items-center gap-2">
      //         <div className="flex flex-col">
      //           <figcaption className="text-sm font-medium dark:text-white ">
      //             {f.name}
      //           </figcaption>
      //         </div>
      //       </div>
      //       <blockquote className="mt-2 text-xs">{f.body}</blockquote>
      //     </figure>
      //   ))}
      // </Marquee>
      <div></div>
    ),
  },
  {
    Icon: TargetIcon,
    name: "あなただけのプラン",
    description: "目標や習慣に合わせて作られた、オーダーメイドのプラン。あなたのペースで無理なく続けられます。",
    className: "col-span-3 lg:col-span-2",
    background: (
      // <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
      <div></div>
    ),
  },
  {
    Icon: ShieldIcon,
    name: "コンテンツブロッカー（強力版）",
    description: "Gen Z向けに設計された強力なブロッカー。あらゆる抜け道に対応し、誘惑をしっかり遮断します。",
    className: "col-span-3 lg:col-span-2",
    background: (
      // <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
      <div></div>
    ),
  },
  {
    Icon: EyeOffIcon,
    name: "こっそりモード",
    description: "アプリアイコンや名前を変更して、スマホ上で目立たないように設定可能。プライバシーを守りたいときに便利です。",
    className: "col-span-3 lg:col-span-1",
    background: (
      // <Marquee
      //   pauseOnHover
      //   className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      // >
      //   {files.map((f, idx) => (
      //     <figure
      //       key={idx}
      //       className={cn(
      //         "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
      //         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      //         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      //         "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //       )}
      //     >
      //       <div className="flex flex-row items-center gap-2">
      //         <div className="flex flex-col">
      //           <figcaption className="text-sm font-medium dark:text-white ">
      //             {f.name}
      //           </figcaption>
      //         </div>
      //       </div>
      //       <blockquote className="mt-2 text-xs">{f.body}</blockquote>
      //     </figure>
      //   ))}
      // </Marquee>
      <div></div>
    ),
  },
];

export function Features() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">やっとやめる？.</h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
        あなたの目標や悩みに合わせて、ぴったりのプランを一緒に作るよ。成功できるように、ちゃんとサポートするからね。
        </p>
      </div>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
