"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchCharacter from "@/components/auth/SearchCharacter";

const messages = [
  "Finding you...",
  "Checking the brain...",
  "Looking for your weird side...",
  "Almost got you...",
];

export default function FindingYouPage() {
  const router = useRouter();
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const startTime = Date.now();

    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, 400);

    const checkUser = async () => {
      try {
        const response = await fetch("/api/user");
        const result = await response.json();

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1500 - elapsedTime, 0);

        // Keep this page visible for at least 1.5 seconds
        await new Promise((resolve) =>
          setTimeout(resolve, remainingTime)
        );

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          console.error("Failed to check user:", result.msg);
          return;
        }

        if (result.data === null) {
          router.replace("/onboarding");
          return;
        }

        router.replace("/");
      } catch (error) {
        console.error("Failed to check user:", error);
      }
    };

    checkUser();

    return () => {
      clearInterval(messageInterval);
    };
  }, [router]);

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5">
      <div className="w-full max-w-md text-center">
        <SearchCharacter />

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {message}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Please don't make this awkward.
        </p>
      </div>
    </main>
  );
}