"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import DetectiveAnimatedCharacter from "@/components/auth/DetectiveAnimatedCharacter";
import { generateRandomName } from "@/lib/nameGenerator";
import { useRouter } from "next/navigation";



export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();

    inputRef.current?.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    );
  }, []);
   useEffect(() => {
    setName(generateRandomName());
  }, []);

  const generateAnotherName = () => {
    const newName = generateRandomName();

    setName(newName);

    requestAnimationFrame(() => {
      inputRef.current?.focus();

      inputRef.current?.setSelectionRange(
        newName.length,
        newName.length
      );
    });
  };

const handleContinue = async () => {
  if (!name.trim() || loading) return;

  try {
    setLoading(true);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: name.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      console.error(result.msg);
      return;
    }

     router.push("/");
    router.refresh();
  } catch (error) {
    console.error("Failed to create user:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="relative flex h-[calc(100vh-82px)] items-center justify-center overflow-hidden bg-background px-5 py-2">
  {/* Background thoughts */}
  <div className="pointer-events-none absolute inset-0 hidden select-none lg:block">
    <p className="absolute left-[8%] top-[18%] -rotate-6 text-sm italic text-foreground/35">
      what if pigeons had jobs?
    </p>

    <p className="absolute right-[8%] top-[27%] rotate-6 text-sm italic text-foreground/35">
      what if socks had opinions?
    </p>

    <p className="absolute bottom-[16%] left-[10%] rotate-3 text-sm italic text-foreground/30">
      what if your fridge judged you?
    </p>

    <p className="absolute bottom-[12%] right-[9%] -rotate-3 text-sm italic text-foreground/30">
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

    <span className="absolute bottom-[22%] right-[17%] rotate-12 text-xl">
      ?
    </span>

    <span className="absolute bottom-[18%] left-[18%] rotate-[-8deg] text-xl">
      ✦
    </span>
  </div>

  {/* Main content */}
  <section className="relative z-10 w-full max-w-lg text-center">
    {/* Privacy message */}
    <div className="mx-auto max-w-md">
      <p className="rotate-[-1deg] text-lg font-black tracking-tight sm:text-xl">
        🕵️ P.S. WE DON&apos;T NEED TO KNOW YOU.
      </p>

      <p className="mt-1 text-sm text-foreground/70 sm:text-base">
        Don&apos;t use your real name.
      </p>

      <p className="text-sm font-bold sm:text-base">
        Be weird. Stay anonymous.
      </p>
    </div>

    {/* Detective */}
    <DetectiveAnimatedCharacter />

    {/* Name input */}
    <div className="relative mx-auto mt-1 w-full max-w-sm">
      <p className="mb-1 rotate-[-2deg] text-sm font-bold italic text-muted-foreground">
        apparently, you&apos;re...
      </p>

      <div className="relative rotate-[-1deg]">
        <span
          className="
            absolute
            -right-2
            -top-3
            z-10
            h-3
            w-12
            rotate-[-4deg]
            border-t-2
            border-dashed
            border-foreground
          "
        />

        <div
          className="
            relative
            border-2
            border-foreground
            bg-background
            shadow-[6px_6px_0px_0px_currentColor]
            transition-all
            duration-150
            focus-within:-translate-x-0.5
            focus-within:-translate-y-0.5
            focus-within:shadow-[8px_8px_0px_0px_currentColor]
          "
        >
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            aria-label="Your What If name"
            className="
              h-14
              w-full
              bg-transparent
              px-5
              text-center
              text-lg
              font-black
              tracking-tight
              text-foreground
              outline-none
              caret-foreground
              selection:bg-foreground
              selection:text-background
            "
          />
        </div>
      </div>
    </div>

    {/* Find another name */}
    <button
      type="button"
      onClick={generateAnotherName}
      className="
        group
        mx-auto
        mt-3
        flex
        items-center
        justify-center
        gap-2
        text-sm
        font-bold
        text-muted-foreground
        transition-colors
        hover:text-foreground
      "
    >
      <RefreshCw
        size={16}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:rotate-180"
      />

      <span>GIVE ME ANOTHER</span>
    </button>

    {/* Let me in */}
  <button
  type="button"
  onClick={handleContinue}
  disabled={!name.trim() || loading}
  className="
    group
    relative
    mx-auto
    mt-4
    flex
    h-13
    w-1/2
    max-w-sm
    items-center
    justify-center
    gap-3
    border-2
    border-foreground
    bg-background
    px-5
    text-sm
    font-bold
    text-foreground
    shadow-[5px_5px_0px_0px_currentColor]
    transition-all
    duration-150
    hover:-translate-x-0.5
    hover:-translate-y-0.5
    hover:shadow-[7px_7px_0px_0px_currentColor]
    active:translate-x-1
    active:translate-y-1
    active:shadow-none
    disabled:pointer-events-none
    disabled:opacity-40
  "
>
  <span>{loading ? "LET ME IN..." : "LET ME IN"}</span>

  {!loading && (
    <ArrowRight
      size={19}
      strokeWidth={2.5}
      className="transition-transform duration-150 group-hover:translate-x-1"
    />
  )}

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
</button>

    {/* Small note */}
    <p className="mt-2 text-xs text-muted-foreground">
      Regret it later. Change it whenever.
    </p>

  </section>
</main>
  );
}