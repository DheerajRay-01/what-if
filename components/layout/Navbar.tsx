import Link from "next/link";
import { MessageCircle, SquareUserIcon } from "lucide-react";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b-2 border-foreground">
      <nav
        className="
          mx-auto flex h-16 max-w-7xl
          items-center justify-between
          px-4 sm:px-6
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
          WHAT IF..?
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/what-ifs"
            className="
              flex items-center gap-1.5
              text-sm font-semibold
              transition-transform
              hover:-rotate-1
            "
          >
            {/* <MessageCircle size={16} strokeWidth={2} /> */}
            Brain Dump
          </Link>

          <Link
            href="/about"
            className="
              text-sm font-semibold
              transition-transform
              hover:rotate-1
            "
          >
            Why?
          </Link>

          {/* Profile / Login */}
          {session?.user ? (
            <Link
              href="/profile"
              className="
                text-sm font-semibold
                transition-transform
                hover:rotate-1
              "
            >
              <SquareUserIcon/>
            </Link>
          ) : (

        <Link
  href="/login"
  className="
    border-2 border-foreground
    bg-foreground
    px-2 py-1
    text-sm font-black
    text-background
    shadow-[3px_3px_0px_0px_currentColor]
    transition-all duration-150
    hover:translate-x-[2px]
    hover:translate-y-[2px]
    hover:shadow-none
    active:translate-x-[3px]
    active:translate-y-[3px]
  "
>
  Login
</Link>
          )}
        </div>
      </nav>
    </header>
  );
}