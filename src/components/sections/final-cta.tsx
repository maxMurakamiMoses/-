"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

export function FinalCTA() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-muted relative max-w-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Profile Picture */}
          <div className="flex justify-center md:justify-end">
            <div className="w-96 h-96 rounded-2xl overflow-hidden">
              <Image
                src="/profilepic.jpg"
                alt="Profile"
                width={384}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Text and Button */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-6">
            少し話しにくい話題かもしれませんが、<br />
            <span className="text-gray-400">無視すべきものではありません。</span>
          </h2>

            <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-3 text-lg font-medium">
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
