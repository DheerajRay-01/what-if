"use client";

export default function WhatIfCardSkeleton() {
  return (
    <article
      className="
        relative
        border-2 border-foreground
        bg-background
        p-5
        shadow-[5px_5px_0px_0px_currentColor]
        sm:p-6
      "
    >
      {/* What If content */}
      <div className="space-y-2">
        <div className="h-6 w-[92%] animate-pulse rounded-sm bg-muted" />
        <div className="h-6 w-[68%] animate-pulse rounded-sm bg-muted" />
      </div>

      {/* Featured Reply */}
      <div
        className="
          mt-7
          border-2 border-foreground
          bg-background
          p-5
        "
      >
        {/* Worse Version heading */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded-sm bg-muted" />
        </div>

        {/* Reply text */}
        <div className="space-y-2">
          <div className="h-4 w-[90%] animate-pulse rounded-sm bg-muted" />
          <div className="h-4 w-[72%] animate-pulse rounded-sm bg-muted" />
        </div>

        {/* More nonsense */}
        <div className="mt-5 flex items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-32 animate-pulse rounded-sm bg-muted" />
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-7 flex items-center justify-between gap-4">
        {/* Reactions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-5 w-9 animate-pulse rounded-sm bg-muted" />
          <div className="h-5 w-9 animate-pulse rounded-sm bg-muted" />
          <div className="h-5 w-9 animate-pulse rounded-sm bg-muted" />
          <div className="h-5 w-9 animate-pulse rounded-sm bg-muted" />
        </div>

        {/* See this nonsense */}
        <div className="h-4 w-32 animate-pulse rounded-sm bg-muted" />
      </div>

      {/* Decorative chaos */}
      <span
        className="
          absolute
          -right-2
          -top-3
          rotate-[-6deg]
          text-lg
        "
      >
        ✦
      </span>
    </article>
  );
}