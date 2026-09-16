import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "What If…?",
  description: "A place for stupid thoughts and terrible ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const metadata: Metadata = {
  metadataBase: new URL("https://whatiff.vercel.app"),

  title: {
    default: "What If…?",
    template: "%s | What If…?",
  },

  description:
    "A place for stupid thoughts, crazy ideas, and terrible suggestions. Post a What If, discover random thoughts, and make them worse.",

  applicationName: "What If…?",

  keywords: [
    "what if",
    "random thoughts",
    "crazy ideas",
    "stupid thoughts",
    "funny ideas",
    "random ideas",
    "what if questions",
  ],

  authors: [
    {
      name: "What If…?",
    },
  ],

  creator: "What If…?",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "What If…?",
    title: "What If…?",
    description:
      "A place for stupid thoughts, crazy ideas, and terrible suggestions. Post a What If, discover random thoughts, and make them worse.",
    url: "https://whatiff.vercel.app/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "What If…? — Stupid thoughts. Crazy ideas.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "What If…?",
    description:
      "A place for stupid thoughts, crazy ideas, and terrible suggestions. Post a What If, discover random thoughts, and make them worse.",
    images: ["/og-image.png"],
  },
};

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Navbar/>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}