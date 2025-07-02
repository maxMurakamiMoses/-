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
  
  faqs: [
    {
      question: "オナサムライはどうやってポルノをやめる手助けをしてくれますか？",
      answer: (
        <span>
          オナサムライは実証された行動科学とAI技術を活用して、ポルノ依存からの脱却をサポートします。  
          あなたに合わせた戦略や進捗の記録、サポート機能を提供し、健康的な習慣を身につけ、やめる決意を維持できるよう支援します。
        </span>
      ),
    },
    {
      question: "進捗の記録はどのように機能しますか？",
      answer: (
        <span>
          オナサムライは日々の進捗や連続達成日数、重要な節目を記録します。  
          あなたの成果を祝福し、パターンや引き金を分析して、より良い対処法を見つける手助けをします。  
          もちろん、データはプライベートかつ安全に管理されています。
        </span>
      ),
    },
    {
      question: "もしリラプス（再発）してしまったらどうなりますか？",
      answer: (
        <span>
          リラプスは回復の過程でよくあることです。オナサムライは責めたり恥をかかせたりせず、  
          失敗から学び、再び軌道に戻るためのサポートを提供します。  
          すぐに使えるサポートと対策が用意されているので、安心して続けられます。
        </span>
      ),
    },
    {
      question: "オナサムライを使うとき、プライバシーは守られますか？",
      answer: (
        <span>
          もちろんです。プライバシーと機密性は最優先事項です。  
          すべてのデータは暗号化され、安全に保管されています。  
          個人情報が外部に共有されることはなく、匿名での利用も可能です。
        </span>
      ),
    },
  ],
  
};

export type SiteConfig = typeof siteConfig;
