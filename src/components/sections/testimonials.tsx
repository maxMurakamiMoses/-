"use client";

import { useState, useEffect } from "react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      image: "/profilepic.jpg",
      text: "This app has completely transformed how we handle our social media campaigns. The automation features save us hours every week."
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      image: "/profilepic.jpg",
      text: "I've tried many social media tools, but this one stands out for its intuitive interface and powerful features. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      image: "/profilepic.jpg",
      text: "As a small business owner, I needed something simple yet effective. This app delivers exactly what I need without overwhelming complexity."
    },
    {
      name: "David Kim",
      role: "Digital Marketing Specialist",
      image: "/profilepic.jpg",
      text: "The analytics and insights provided by this platform have helped us make data-driven decisions that significantly improved our social media performance."
    },
    {
      name: "Lisa Thompson",
      role: "Influencer",
      image: "/profilepic.jpg",
      text: "Managing multiple social media accounts used to be a nightmare. This app makes it seamless and actually enjoyable to use."
    },
    {
      name: "Alex Morgan",
      role: "Social Media Coordinator",
      image: "/profilepic.jpg",
      text: "The scheduling feature alone has been a game-changer for our team. We can now plan content weeks in advance with ease."
    },
    {
      name: "Jessica Park",
      role: "Brand Manager",
      image: "/profilepic.jpg",
      text: "The brand consistency features are incredible. We can maintain our voice across all platforms effortlessly while reaching new audiences."
    },
    {
      name: "Ryan Williams",
      role: "Startup Founder",
      image: "/profilepic.jpg",
      text: "As a startup, we needed to maximize our social media impact with minimal resources. This tool has been our secret weapon for growth."
    },
    {
      name: "Maria Garcia",
      role: "Community Manager",
      image: "/profilepic.jpg",
      text: "The community engagement tools have revolutionized how we interact with our audience. Response times have improved dramatically."
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
            Thousands of people vouch for our porn addiction app,<br /><span className="text-purple-700"> and there's a good reason why.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Peoples lives have been changed forever with the use of our app, leading to unspeakable amounts of gratitude.
          </p>
        </div>
        
        <div className="min-h-[400px] relative">
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 py-10 transition-opacity duration-300 ${
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
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
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

        {/* Tab Navigation - Fixed positioning */}
        <div className="flex justify-center -mt-32">
          <div className="flex space-x-2">
            {Array.from({ length: totalGroups }, (_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentGroup === index
                    ? "bg-purple-700 scale-125"
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
