import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b-2 border-foreground bg-background">
      <nav
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-lg
            font-black
            tracking-[-0.04em]
            transition-transform
            duration-150
            hover:-rotate-1
            sm:text-xl
          "
        >
          WHAT IF..?
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Brain Dump */}
          <Link
            href="/whatifs"
            className="
              relative
              text-sm
              font-bold
              transition-transform
              duration-150
              hover:-rotate-1
              after:absolute
              after:-bottom-1
              after:left-0
              after:h-[2px]
              after:w-0
              after:bg-foreground
              after:transition-all
              after:duration-150
              hover:after:w-full
            "
          >
            Brain Dump
          </Link>

          {/* Why */}
          <Link
            href="/about"
            className="
              relative
              text-sm
              font-bold
              transition-transform
              duration-150
              hover:rotate-1
              after:absolute
              after:-bottom-1
              after:left-0
              after:h-[2px]
              after:w-0
              after:bg-foreground
              after:transition-all
              after:duration-150
              hover:after:w-full
            "
          >
            Why?
          </Link>

          {/* Profile / Login */}
          {session?.user ? (
            <Link
              href="/me"
              aria-label="Your profile"
              className="group ml-1"
            >
              <div
                className="
                  h-9
                  w-9
                  rotate-2
                  overflow-hidden
                  border-2
                  border-foreground
                  bg-muted
                  shadow-[2px_2px_0px_0px_currentColor]
                  transition-all
                  duration-150
                  group-hover:-translate-y-0.5
                  group-hover:rotate-[-2deg]
                  group-hover:shadow-[3px_3px_0px_0px_currentColor]
                "
              >
                <img
                  src="https://i.pinimg.com/236x/9e/83/05/9e830596b31163b9965c2f980e8e8b97.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="
                border-2
                border-foreground
                bg-foreground
                px-3
                py-1.5
                text-sm
                font-black
                text-background
                shadow-[3px_3px_0px_0px_currentColor]
                transition-all
                duration-150
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