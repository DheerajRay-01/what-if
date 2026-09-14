import WhatIfInfiniteFeed from "@/components/feed/WhatIfInfiniteFeed";
import Image from "next/image";

export default function WhatIfsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
           <Image
                  src="/emojis/brain.svg"
                  alt=""
                  width={62}
                  height={62}
                  className="transition-transform group-hover:rotate-12 inline"
                />
           THE COLLECTIVE BRAIN DUMP
        </h1>

        <div
          aria-hidden="true"
          className="
            mt-1
            h-1
            w-36
            rotate-[-2deg]
            border-b-2
            border-dashed
            border-foreground
          "
        />
      </div>

      <WhatIfInfiniteFeed />
    </main>
  );
}