import Link from "next/link";
import { Share2 } from "lucide-react";

export default function Navbar() {
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