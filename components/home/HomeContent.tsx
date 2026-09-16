"use client";

import useWhatIfs from "@/hooks/useWhatIfs";
import Hero from "./Hero";
import WhatIfFeed from "./WhatIfFeed";

export default function HomeContent() {
  const {
    posts,
    loading,
    posting,
    createWhatIf,
  } = useWhatIfs();

  return (
    <>
      <Hero
        onSubmit={createWhatIf}
        loading={posting}
      />

      <main className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <WhatIfFeed
          posts={posts}
          loading={loading}
        />
      </main>
    </>
  );
}