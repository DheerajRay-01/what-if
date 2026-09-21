import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { Suspense } from "react";

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
        <Suspense
  fallback={
    <header className="border-b-2 border-foreground">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="h-6 w-28 animate-pulse bg-muted" />

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="h-5 w-24 animate-pulse bg-muted" />
          <div className="h-5 w-10 animate-pulse bg-muted" />
          <div className="h-9 w-16 animate-pulse bg-muted" />
        </div>
      </nav>
    </header>
  }
>
  <Navbar />
</Suspense>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}