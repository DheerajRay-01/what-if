import Image from "next/image";
import AnimatedCharacter from "./AnimatedCharacter";
import { LogIn } from "lucide-react";
import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";

export default function LoginPage() {

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-4">
      {/* Background thoughts */}
      <div className="pointer-events-none absolute inset-0 hidden select-none lg:block">
        <p className="absolute left-[8%] top-[18%] -rotate-6 text-sm italic text-foreground/35">
          what if pigeons had jobs?
        </p>

        <p className="absolute right-[8%] top-[27%] rotate-6 text-sm italic text-foreground/35">
          what if socks had opinions?
        </p>

        <p className="absolute bottom-[20%] left-[10%] rotate-3 text-sm italic text-foreground/30">
          what if your fridge judged you?
        </p>

        <p className="absolute bottom-[16%] right-[9%] -rotate-3 text-sm italic text-foreground/30">
          probably a bad idea.
        </p>
      </div>

      {/* Doodles */}
      <div className="pointer-events-none absolute inset-0 hidden select-none sm:block">
        <span className="absolute left-[15%] top-[30%] rotate-[-12deg] text-3xl">
          ?
        </span>

        <span className="absolute right-[18%] top-[19%] rotate-[15deg] text-2xl">
          ✦
        </span>

        <span className="absolute bottom-[27%] right-[17%] rotate-12 text-xl">
          ?
        </span>

        <span className="absolute bottom-[22%] left-[18%] rotate-[-8deg] text-xl">
          ✦
        </span>
      </div>

      {/* Main content */}
      <section className="relative z-10 w-full max-w-lg text-center">
        {/* Brand */}
        <div className="relative inline-block">
          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            <Image
              src="/emojis/thinking-face.svg"
              alt=""
              width={52}
              height={52}
              className="mr-1 inline-block align-middle"
            />

            WHAT IF

            <span className="relative ml-1 inline-block rotate-[-7deg]">
              ..?
            </span>
          </h1>
        </div>

        {/* Message */}
        <div className="mt-2">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Nobody&apos;s asking who you are.
          </h2>

          <p className="mt-2 text-base italic text-muted-foreground sm:text-lg">
            We&apos;re just curious what you think.
          </p>
        </div>

        {/* Animated character */}
        <AnimatedCharacter />

        {/* Google button */}

  <form
          action={async () => {
            "use server";

            await signIn("google", { redirectTo: "/finding-you" })
          }}
        >       
   <button
   type="submit"
  className="
    group
    relative
    mx-auto mt-4
    flex h-14 w-full max-w-sm
    items-center justify-center gap-3
    border-2 border-foreground
    bg-background
    px-5
    text-sm font-bold text-foreground
    shadow-[5px_5px_0px_0px_currentColor]
    transition-all duration-150
    hover:-translate-x-0.5
    hover:-translate-y-0.5
    hover:shadow-[7px_7px_0px_0px_currentColor]
    active:translate-x-1
    active:translate-y-1
    active:shadow-none
  "
>
  {/* Small card-style decoration */}
  <span
    className="
      absolute
      -right-2
      -top-2
      h-3
      w-12
      rotate-[-4deg]
      border-t-2
      border-dashed
      border-foreground
    "
  />

    <Image
    src="/emojis/google.svg"
    alt=""
    width={30}
    height={30}
    className="shrink-0"
  />

  <span>Continue with Google</span>

  <span
    className="
      text-base
      transition-transform
      duration-150
      group-hover:translate-x-1
    "
  >
    →
  </span>
</button>
</form>

        {/* Privacy */}
        <p className="mt-3 text-sm text-muted-foreground">
          Your Google identity stays private.
        </p>

        {/* Bottom line */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="h-px w-16 border-t-2 border-dashed border-foreground/30" />

          <span className="rotate-[-2deg]">
            dump a thought ✦
          </span>

          <span className="h-px w-16 border-t-2 border-dashed border-foreground/30" />
        </div>
      </section>
    </main>
  );
}