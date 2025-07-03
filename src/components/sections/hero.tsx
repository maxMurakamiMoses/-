"use client";

import { Icons } from "@/components/icons";
import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <>
      <Section id="hero" className="min-h-[100vh] w-full overflow-hidden">
        <main className="mx-auto text-center relative px-4">
          <div className="relative">
            <motion.div
              initial={{ scale: 4.5, height: "80vh" }}
              animate={{ scale: 1, height: "10vh" }}
              transition={{
                scale: { delay: 0, duration: 1.8, ease: easeInOutCubic },
                height: { delay: 0, duration: 1.8, ease: easeInOutCubic },
              }}
              className="mb-16 relative z-20"
              style={{ transformOrigin: "top" }}
            >
              <div className="bg-onasamurai text-white text-xl font-bold p-2 h-20 w-20 flex items-center justify-center rounded-3xl mx-auto shadow-md">
                <Icons.logo className="w-16 h-16" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute inset-0 top-20 z-10 text-sm"
            >
              オナサムライ
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto -mt-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeInOutCubic }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tighter"
            >
              一生ポルノ卒業、<br />オナサムライと一緒に
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: easeInOutCubic }}
              className="max-w-2xl mx-auto text-lg md:text-xl mb-8 font-medium text-balance"
            >
              できる男が使っている日本初オナ禁専用アプリ
            </motion.p>
            <div className="flex justify-center mb-16">
            <Image
              className="cursor-pointer rounded-md border border-neutral-900 dark:border-neutral-700"
              src="https://cdn.magicui.design/playstore-download.png"
              alt="Download on Google Play Store"
              width={120}
              height={40}
            />
            <Image
              className="cursor-pointer rounded-md border border-neutral-900 dark:border-neutral-700"
              src="https://cdn.magicui.design/ios-download.png"
              alt="Download on Apple App Store"
              width={120}
              height={40}
            />
            </div>
          </div>
          <div className="flex flex-col items-center w-full -mt-32 sm:-mt-44 md:-mt-64 lg:-mt-88">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-full max-w-8xl h-auto object-contain flex-shrink-0 flex justify-center items-center mt-64"
            >
              <Image
                src="/landing.png"
                alt="Landing"
                width={1024}
                height={300}
                className=""
              />
            </motion.div>
            {/*
            <div className="flex gap-2 sm:gap-4 py-4 sm:py-8">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">⭐</span>
              ))}
            </div>
          </div>
          <div className="text-white text-3xl sm:text-5xl font-bold text-center mb-3">5スターが一万個以上！</div>
          <div className="flex items-center justify-center gap-6 text-white text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Icons.apple className="w-7 h-7" />
              <span>4.7</span>
            </div>
            <span className="text-2xl">•</span>
            <div className="flex items-center gap-2">
              <Icons.google className="w-7 h-7" />
              <span>4.5</span>
            </div>
            */}
          </div>
        </main>
      </Section>
    </>
  );
}
