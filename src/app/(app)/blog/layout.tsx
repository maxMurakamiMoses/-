import {Footer} from "@/components/sections/footer";
import {Header} from "@/components/sections/header";
import { siteConfig } from "@/lib/config";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/blog?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
