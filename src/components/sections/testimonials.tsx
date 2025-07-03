"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "たけし",
      role: "大学生",
      image: "/profilepic.jpg",
      text: "正直、人生変わりました。毎日ポルノを見てた自分が、今は集中力も自信も取り戻しています。"
    },
    {
      name: "ゆうた",
      role: "営業職",
      image: "/profilepic.jpg",
      text: "このアプリを使ってから、毎日のムダな時間がゼロに。仕事もプライベートも充実してきました。"
    },
    {
      name: "しょうた",
      role: "フリーランスエンジニア",
      image: "/profilepic.jpg",
      text: "長年悩んでたポルノ依存から抜け出せたのは、このアプリのおかげです。正直、もっと早く知りたかった。"
    },
    {
      name: "けんたろう",
      role: "新卒会社員",
      image: "/profilepic.jpg",
      text: "リマインダー機能とコミュニティサポートが本当に助かる。1人じゃないって感じられるのがデカい。"
    },
    {
      name: "たかひろ",
      role: "起業家",
      image: "/profilepic.jpg",
      text: "毎朝の習慣をこのアプリで整えたら、毎日が前向きになった。成功者のマインドが身につく感じ。"
    },
    {
      name: "りく",
      role: "大学院生",
      image: "/profilepic.jpg",
      text: "ポルノから離れたことで、集中力が爆上がり。論文もサクサク進むようになった。"
    },
    {
      name: "だいち",
      role: "パーソナルトレーナー",
      image: "/profilepic.jpg",
      text: "身体だけじゃなく、メンタルも鍛える時代。このアプリはそのための最高の武器。"
    },
    {
      name: "ゆうま",
      role: "ゲーム開発者",
      image: "/profilepic.jpg",
      text: "スマホの誘惑に勝てなかった自分が、今は意志力強めの戦士に。習慣トラッカー機能が超使える。"
    },
    {
      name: "こうすけ",
      role: "高校教師",
      image: "/profilepic.jpg",
      text: "このアプリを使い始めてから、生徒に対しても堂々と接することができるようになりました。"
    }
  ];
  

  const [currentGroup, setCurrentGroup] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const testimonialsPerGroup = 3;
  const totalGroups = Math.ceil(testimonials.length / testimonialsPerGroup);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGroup((prev) => (prev + 1) % totalGroups);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalGroups]);

  const handleTabClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroup(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentTestimonials = testimonials.slice(
    currentGroup * testimonialsPerGroup,
    (currentGroup + 1) * testimonialsPerGroup
  );

  return (
    <section className="bg-black py-20">
      <div className="max-w-6xl mx-auto px-10">
        <div className="text-left mb-8">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
  何千人ものユーザーがこのポルノ依存対策アプリを<br />
  <span className="text-blue-500">おすすめするのには、ちゃんと理由があります。</span>
</h2>
<p className="mt-4 text-lg text-muted-foreground">
  このアプリで人生が大きく変わったという声が続々と届いています。感謝の言葉が尽きないほどです。
</p>

        </div>
        
        <div className="min-h-[400px] relative">
          <div className={`columns-1 lg:columns-3 gap-4 space-y-4 py-10 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={`${currentGroup}-${index}`}
                className="bg-muted/60 overflow-hidden rounded-3xl flex flex-col h-fit"
                style={{
                  gridRow: `span ${Math.floor(testimonial.text.length / 50) + 1}`,
                }}
              >
                <div className="px-4 py-5 sm:p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                    />
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Responsive margin for different screen sizes */}
        <div className="flex justify-center mt-8 lg:-mt-32">
          <div className="flex space-x-2">
            {Array.from({ length: totalGroups }, (_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentGroup === index
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonials group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
