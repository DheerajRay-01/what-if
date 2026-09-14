import WhatIfInput from "./WhatIfInput";

export default function Hero() {
  return (
    <section className="flex min-h-[55vh] items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h1
          className="
            text-4xl font-black tracking-[-0.04em]
            sm:text-5xl
            lg:text-6xl
          "
        >
          WHAT IF…?
        </h1>

        {/* Tagline */}
        <p
          className="
            mx-auto mt-5 max-w-2xl
            text-lg font-medium leading-relaxed
            sm:text-xl
            lg:text-2xl
          "
        >
          What if your stupidest thought
          isn&apos;t actually stupid?
        </p>

        {/* Input */}
        <div className="relative mx-auto mt-8 w-full max-w-2xl sm:mt-10">
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-3 -top-3
              z-10 h-5 w-12
              rotate-[-6deg]
              border-t-2
              border-dashed
              border-foreground
            "
          />

          <WhatIfInput />
        </div>
      </div>
    </section>
  );
}