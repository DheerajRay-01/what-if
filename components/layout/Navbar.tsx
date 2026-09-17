"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const handleShare = async () => {
    const url = window.location.origin;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "What If…?",
          text: "A place for stupid thoughts, crazy ideas, and terrible suggestions.",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied! Spread the nonsense. 💥");
      }
    } catch (error) {
      // User closed the native share dialog
      if ((error as Error).name !== "AbortError") {
        toast.error("Couldn't share right now.");
      }
    }
  };

  return (
    <header className="border-b-2 border-foreground">
      <nav
        className="
          mx-auto flex h-16 max-w-7xl
          items-center justify-between
          px-4
          sm:px-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-lg font-black
            tracking-[-0.03em]
            transition-transform
            hover:-rotate-1
            sm:text-xl
          "
        >
          WHAT IF…?
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/about"
            className="
              text-sm font-semibold
              transition-transform
              hover:-rotate-1
            "
          >
            About
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="
              flex items-center gap-1.5
              text-sm font-semibold
              transition-transform
              hover:rotate-1
            "
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </nav>
    </header>
  );
}