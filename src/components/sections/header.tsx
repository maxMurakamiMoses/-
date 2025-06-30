"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAddBorder(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Set isInitialLoad to false after the component has mounted
    setIsInitialLoad(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{
        duration: isInitialLoad ? 1 : 0.3,
        delay: isInitialLoad ? 0.5 : 0,
        ease: easeInOutCubic,
      }}
      className="sticky top-0 z-50 w-full overflow-hidden"
    >
      {/* Blur effect layers */}
      <div className="pointer-events-none absolute inset-0 z-[1] h-[20vh] backdrop-blur-[0.0625px] [mask-image:linear-gradient(0deg,transparent_0%,#000_12.5%,#000_25%,transparent_37.5%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[2] h-[20vh] backdrop-blur-[0.125px] [mask-image:linear-gradient(0deg,transparent_12.5%,#000_25%,#000_37.5%,transparent_50%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[3] h-[20vh] backdrop-blur-[0.25px] [mask-image:linear-gradient(0deg,transparent_25%,#000_37.5%,#000_50%,transparent_62.5%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[4] h-[20vh] backdrop-blur-[0.5px] [mask-image:linear-gradient(0deg,transparent_37.5%,#000_50%,#000_62.5%,transparent_75%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[5] h-[20vh] backdrop-blur-[1px] [mask-image:linear-gradient(0deg,transparent_50%,#000_62.5%,#000_75%,transparent_87.5%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[6] h-[20vh] backdrop-blur-[2px] [mask-image:linear-gradient(0deg,transparent_62.5%,#000_75%,#000_87.5%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-0 z-[7] h-[20vh] backdrop-blur-[4px] [mask-image:linear-gradient(0deg,transparent_75%,#000_87.5%,#000_100%,transparent_112.5%)]"></div>
      
      {/* Main content */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-5 sm:px-10">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2 z-[10]"
        >
          <Icons.logo className="w-8 h-8" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>
        <div className="hidden lg:block z-[10]">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-8 text-white rounded-full group"
            )}
          >
            {siteConfig.cta}
          </Link>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden z-[10]">
          <MobileDrawer />
        </div>
      </div>
      
      {/* Bottom border */}
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: addBorder ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute w-full bottom-0 z-[10]"
      />
    </motion.header>
  );
}
