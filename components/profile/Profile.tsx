"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Mail,
  UserRound,
  Hash,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

interface UserData {
  id: string;
  displayName: string;
  publicId: string;
  email: string;
  name: string | null;
}

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/user");
        const result = await response.json();

        if (!response.ok || !result.status) {
          console.error(result.msg);
          return;
        }

        setUser(result.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-lg border-2 border-foreground bg-background p-6 shadow-[6px_6px_0px_0px_currentColor] sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-3 w-32 bg-muted" />
          <div className="h-9 w-56 bg-muted" />

          <div className="space-y-3">
            <div className="h-20 w-full bg-muted" />
            <div className="h-20 w-full bg-muted" />
            <div className="h-20 w-full bg-muted" />
          </div>

          <div className="h-12 w-full bg-muted" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-lg border-2 border-foreground bg-background p-8 text-center shadow-[6px_6px_0px_0px_currentColor]">
        <div className="text-4xl">🫠</div>

        <h2 className="mt-4 text-xl font-black">
          We couldn't find you.
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went slightly wrong.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg">
      {/* Decorative mark */}
      <span className="absolute -right-2 -top-4 z-10 rotate-6 text-xl">
        ✦
      </span>

      <section
        className="
          border-2 border-foreground
          bg-background
          shadow-[6px_6px_0px_0px_currentColor]
        "
      >
        {/* Header */}
        <div
          className="
            border-b-2 border-dashed border-foreground/30
            p-6 sm:p-8
          "
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
            Your little corner
          </p>

          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Hey, {user.displayName}
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Your real identity stays backstage. Out here, you're just
                your weird little What If self.
              </p>
            </div>

            <div className="hidden shrink-0 text-4xl sm:block">
              👀
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <div className="space-y-4">
            {/* What If Identity */}
            <div
              className="
                border-2 border-foreground
                bg-background
                p-4
                shadow-[3px_3px_0px_0px_currentColor]
              "
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} strokeWidth={2.5} />

                <p className="text-xs font-black uppercase tracking-wider">
                  Your What If Name
                </p>
              </div>

              <p className="mt-2 text-xl font-black tracking-tight">
                {user.displayName}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                This is who people know you as here.
              </p>
            </div>

            {/* Secret Identity */}
            {/* <div
              className="
                border-2 border-foreground
                bg-muted/30
                p-4
              "
            >
              <div className="flex items-center gap-2">
                <LockKeyhole size={16} strokeWidth={2.5} />

                <p className="text-xs font-black uppercase tracking-wider">
                  Secret Identity
                </p>
              </div>

              <p className="mt-2 text-base font-bold">
                {user.name || "Not available"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Don't worry. We don't put this name on your What Ifs.
              </p>
            </div> */}

            {/* Public ID */}
            <div
              className="
                border-2 border-foreground
                p-4
              "
            >
              <div className="flex items-center gap-2">
                <Hash size={16} strokeWidth={2.5} />

                <p className="text-xs font-black uppercase tracking-wider">
                  Public ID
                </p>
              </div>

              <p className="mt-2 text-base font-black tracking-wide">
                #{user.publicId}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Your unique What If identity.
              </p>
            </div>

            {/* Email */}
            <div
              className="
                border-2 border-foreground
                p-4
              "
            >
              <div className="flex items-center gap-2">
                <Mail size={16} strokeWidth={2.5} />

                <p className="text-xs font-black uppercase tracking-wider">
                  Email
                </p>
              </div>

              <p className="mt-2 break-all text-sm font-bold sm:break-normal">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOut({ redirectTo: "/login" })}
            className="
              group mt-6 flex h-12 w-full
              items-center justify-center gap-2
              border-2 border-foreground
              bg-foreground
              px-5
              text-sm font-black
              text-background
              shadow-[4px_4px_0px_0px_currentColor]
              transition-all duration-150
              hover:translate-x-[2px]
              hover:translate-y-[2px]
              hover:shadow-none
              active:translate-x-[4px]
              active:translate-y-[4px]
              active:shadow-none
            "
          >
            LOG OUT

            <span className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}