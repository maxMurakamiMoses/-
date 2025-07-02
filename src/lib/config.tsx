import {
  BellIcon,
  BrainIcon,
  CalendarIcon,
  ClockIcon,
  CloudIcon,
  UsersIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

// Get the base URL from environment or construct it
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // For production, construct from Vercel environment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // For local development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Fallback - should be overridden in production
  return 'https://your-domain.com';
};

export const siteConfig = {
  name: "オナサムライ",
  description: "一生ポルノをやめよう",
  cta: "Download",
  url: getBaseUrl(),
  keywords: [
    "AI Calendar",
    "Smart Scheduling",
    "Productivity",
    "Time Management",
  ],
  links: {
    email: "support@calai.app",
    twitter: "https://twitter.com/calaiapp",
    discord: "https://discord.gg/calaiapp",
    github: "https://github.com/calaiapp",
    instagram: "https://instagram.com/calaiapp",
  },
  features: [
    {
      name: "AI-Powered Scheduling",
      description:
        "Intelligent scheduling that learns your preferences and optimizes your time.",
      icon: <BrainIcon className="h-6 w-6" />,
    },
    {
      name: "Smart Time Blocking",
      description:
        "Automatically block time for focused work and personal activities.",
      icon: <ClockIcon className="h-6 w-6" />,
    },
    {
      name: "Predictive Event Planning",
      description:
        "AI suggests optimal times for meetings and events based on your habits.",
      icon: <CalendarIcon className="h-6 w-6" />,
    },
    {
      name: "Cloud Sync",
      description: "Access your schedule across all devices in real-time.",
      icon: <CloudIcon className="h-6 w-6" />,
    },
    {
      name: "Team Collaboration",
      description: "Easily coordinate schedules with team members and clients.",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      name: "Smart Reminders",
      description:
        "Contextual notifications that adapt to your schedule and priorities.",
      icon: <BellIcon className="h-6 w-6" />,
    },
  ],

  
  benefits: [
    {
      id: 1,
      text: "Save hours each week with AI-optimized scheduling.",
      image: "/Device-6.png",
    },
    {
      id: 2,
      text: "Reduce scheduling conflicts and double-bookings.",
      image: "/Device-7.png",
    },
    {
      id: 3,
      text: "Improve work-life balance with smart time allocation.",
      image: "/Device-8.png",
    },
    {
      id: 4,
      text: "Increase productivity with AI-driven time management insights.",
      image: "/Device-1.png",
    },
  ],
  pricing: [
    {
      name: "Basic",
      href: "#",
      price: "$0",
      period: "month",
      yearlyPrice: "$0",
      features: [
        "AI-powered scheduling (up to 10 events/month)",
        "Basic time blocking",
        "Cloud sync for 1 device",
        "Email reminders",
      ],
      description: "Perfect for individual users",
      buttonText: "Start Free",
      isPopular: false,
    },
    {
      name: "Pro",
      href: "#",
      price: "$12",
      period: "month",
      yearlyPrice: "$120",
      features: [
        "Unlimited AI-powered scheduling",
        "Advanced time blocking and analysis",
        "Cloud sync for unlimited devices",
        "Smart notifications across all devices",
        "Team collaboration features",
      ],
      description: "Ideal for professionals and small teams",
      buttonText: "Upgrade to Pro",
      isPopular: true,
    },
  ],
  faqs: [
    {
      question: "How does クイッター help me quit porn?",
      answer: (
        <span>
          クイッター uses proven behavioral science and AI technology to help you break free from porn addiction. 
          The app provides personalized strategies, progress tracking, and support to help you develop healthier habits 
          and maintain your commitment to quitting.
        </span>
      ),
    },
    {
      question: "How does the progress tracking work?",
      answer: (
        <span>
          クイッター tracks your daily progress, streaks, and milestones. The app celebrates your achievements 
          and provides insights into your patterns to help you identify triggers and develop better coping strategies. 
          Your data is kept private and secure.
        </span>
      ),
    },
    {
      question: "What if I relapse while using クイッター?",
      answer: (
        <span>
          Relapses are a normal part of the recovery process. クイッター doesn&apos;t judge or shame you - instead, 
          it helps you learn from setbacks and get back on track. The app provides immediate support and 
          strategies to help you continue your journey.
        </span>
      ),
    },
    {
      question: "Is my privacy protected when using クイッター?",
      answer: (
        <span>
          Absolutely. Your privacy and confidentiality are our top priorities. All your data is encrypted 
          and stored securely. We never share your personal information, and you can use the app anonymously 
          if you prefer.
        </span>
      ),
    },
    
  ],
  footer: [
    {
      id: 1,
      menu: [
        { href: "#", text: "Features" },
        { href: "#", text: "Pricing" },
        { href: "#", text: "About Us" },
        { href: "#", text: "Blog" },
        { href: "#", text: "Contact" },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
