"use client";

import { buttonVariants } from "@/components/ui/button";
import { easeOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  direction: "ltr" | "rtl";
  isActive: boolean;
}

function Feature({
  title,
  description,
  imageSrc,
  direction,
  isActive,
}: FeatureProps) {
  const isLTR = direction === "ltr";
  const textVariants = {
    hidden: { opacity: 0, x: isLTR ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isLTR ? -10 : 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeOutCubic,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-between pb-10 transition-all duration-500 ease-out",
        isLTR ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <motion.div
        className={cn(
          "w-full lg:w-1/2 mb-10 lg:mb-0",
          isLTR ? "lg:pr-8" : "lg:pl-8"
        )}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={textVariants}
      >
        <div className="flex flex-col gap-4 max-w-lg text-center lg:text-left mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p className="text-lg md:text-xl" variants={itemVariants}>
            {description}
          </motion.p>
        </div>
      </motion.div>
      <div className="w-full lg:w-1/2">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={600}
          className="w-full max-w-[300px] mx-auto"
        />
      </div>
    </motion.div>
  );
}

export function FeatureHighlight() {
  const features = [
    {
      title: "ダッシュボードを開く",
      description:
        "QUITTRであなたの歩みをひと目でチェック。連続記録や進捗をグラフで確認しながら、目標に向けてブレずに進めるようサポートします。",
      imageSrc: "/Device-2.png",
      direction: "rtl" as const,
    },
    {
      title: "進捗を記録・確認",
      description:
        "回復の過程を深く理解するための分析機能。習慣やパターンを可視化し、改善に向けた行動につなげていくことができます。",
      imageSrc: "/Device-3.png",
      direction: "ltr" as const,
    },
    {
      title: "「学ぶ」で断ち切る力を強化",
      description:
        "専門的な知識と実践的な戦略で、理解を深めながら回復を後押し。役立つコンテンツを通して、自分の状態を知り、健全な対処スキルを身につけていきましょう。",
      imageSrc: "/Device-4.png",
      direction: "rtl" as const,
    },
  ];
  

  const [activeFeature, setActiveFeature] = useState(-1);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { top, bottom } = container.getBoundingClientRect();
        const middleOfScreen = window.innerHeight / 2;
        const featureHeight = (bottom - top) / features.length;

        const activeIndex = Math.floor((middleOfScreen - top) / featureHeight);
        setActiveFeature(
          Math.max(-1, Math.min(features.length - 1, activeIndex))
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [features.length]);

  return (
    <section
      id="feature-highlight"
      className="container px-10 py-28"
      ref={containerRef}
    >
      <div className="text-center mb-16 ">
        <p className="text-sm text-balance font-mono font-semibold tracking-wider uppercase pb-4 text-blue-500">使い方</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto ">
        オナサムライがポルノ依存からの解放をどうサポートするか
        </h2>
       
      </div>
      {features.map((feature, index) => (
        <Feature key={index} isActive={activeFeature === index} {...feature} />
      ))}
    </section>
  );
}
