import HomeContent from "@/components/home/HomeContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "What If…? — Stupid Thoughts. Crazy Ideas.",
  description:
    "What if your stupidest thought isn't actually stupid? Post random thoughts, discover crazy ideas, and make them worse.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://whatiff.vercel.app/",
    title: "What If…? — Stupid Thoughts. Crazy Ideas.",
    description:
      "What if your stupidest thought isn't actually stupid? Post random thoughts, discover crazy ideas, and make them worse.",
    siteName: "What If…?",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "What If…? — Stupid Thoughts. Crazy Ideas.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "What If…? — Stupid Thoughts. Crazy Ideas.",
    description:
      "What if your stupidest thought isn't actually stupid? Post random thoughts, discover crazy ideas, and make them worse.",
    images: ["/og-image.png"],
  },
};


export default function Home() {
  return <HomeContent />;
}