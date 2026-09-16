export default function Loading() {
  return (
    <main className="px-4 pt-10 pb-20 md:pt-10">
      {/* Back button */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="h-9 w-28 animate-pulse border-2 border-black bg-black/10" />
      </div>

      {/* What If Detail */}
      <section className="mx-auto mt-8 w-full max-w-2xl">
        <div
          className="
            relative
            border-2
            border-black
            bg-[#fffdf5]
            p-6
            shadow-[6px_6px_0_#000]
            sm:p-8
          "
        >
          {/* Small doodle */}
          <div className="absolute -top-2 right-5 h-[3px] w-14 rotate-[-5deg] bg-black/10" />

          {/* WHAT IF label */}
          <div className="h-4 w-24 animate-pulse bg-black/10" />

          {/* Content */}
          <div className="mt-7 space-y-3">
            <div className="h-7 w-full animate-pulse bg-black/10" />
            <div className="h-7 w-[92%] animate-pulse bg-black/10" />
            <div className="h-7 w-[68%] animate-pulse bg-black/10" />
          </div>

          {/* Reactions / Share */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5"
                >
                  <div className="size-5 animate-pulse rounded-full bg-black/10" />
                  <div className="h-4 w-4 animate-pulse bg-black/10" />
                </div>
              ))}
            </div>

            <div className="h-4 w-28 animate-pulse bg-black/10" />
          </div>
        </div>
      </section>

      {/* Replies */}
      <section className="mx-auto mt-14 w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-52 animate-pulse bg-black/10" />
          <div className="h-4 w-20 animate-pulse bg-black/10" />
        </div>

        {/* Reply Input */}
        <div className="mb-7">
          <div
            className="
              border-2
              border-black
              bg-[#fffdf5]
              p-2
              shadow-[3px_3px_0_#000]
            "
          >
            <div className="flex items-end gap-2">
              <div className="h-10 flex-1 animate-pulse bg-black/10" />

              <div className="h-10 w-32 animate-pulse bg-black/10" />
            </div>
          </div>
        </div>

        {/* Reply Cards */}
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                relative
                border-2
                border-black
                bg-[#fffdf5]
                p-5
                shadow-[4px_4px_0_#000]
              "
            >
              {/* Doodle */}
              <div
                className="
                  absolute
                  -top-1
                  right-4
                  h-[3px]
                  w-10
                  rotate-[4deg]
                  bg-black/10
                "
              />

              {/* Reply text */}
              <div className="space-y-2">
                <div className="h-4 w-[90%] animate-pulse bg-black/10" />
                <div className="h-4 w-[65%] animate-pulse bg-black/10" />
              </div>

              {/* Action */}
              <div className="mt-5 h-4 w-28 animate-pulse bg-black/10" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}