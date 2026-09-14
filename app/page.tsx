import Hero from "@/components/home/Hero";
import WhatIfFeed from "@/components/home/WhatIfFeed";
import WhatIfCard from "@/components/what-if/WhatIfCard";

export default function Home() {
  return (
    <>
      <Hero />

        <main className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <WhatIfFeed />  
      </main>
    </>
  );
}