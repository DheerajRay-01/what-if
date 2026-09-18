"use client";

export default function FeedLoadingMessage() {
  return (
    <div className="flex w-full items-center justify-center px-4    ">
      {/* Desktop / Laptop */}
      <div
        className="
          hidden
          w-full max-w-5xl
          items-center justify-center
          gap-5
          text-center
          lg:flex
          xl:gap-7
        "
      >
        {/* Thinking */}
        <div
          className="
            shrink-0
            -rotate-6
            text-4xl
            xl:text-5xl
          "
        >
          🤨
        </div>

        {/* Loading */}
        <div className="leading-none">
          <p
            className="
              text-sm
              font-black
              uppercase
              tracking-wide
              xl:text-base
            "
          >
            WHILE WE FIND
          </p>

          <p
            className="
              mt-1
              -rotate-1
              text-lg
              font-black
              uppercase
              italic
              xl:text-xl
            "
          >
            SOME NONSENSE...
          </p>
        </div>

        {/* Arrow */}
        <div
          className="
            shrink-0
            text-2xl
            font-black
            xl:text-3xl
          "
        >
          →
        </div>

        {/* Brain */}
        <div className="leading-none">
          <p
            className="
              text-lg
              font-black
              uppercase
              xl:text-xl
            "
          >
            YOU HAVE A BRAIN.
          </p>

          <p
            className="
              mt-1
              text-base
              font-black
              uppercase
              xl:text-lg
            "
          >
            USE IT. <span className="text-base">🧠</span>
          </p>
        </div>

        {/* Arrow */}
        <div
          className="
            shrink-0
            text-2xl
            font-black
            xl:text-3xl
          "
        >
          →
        </div>

        {/* CTA */}
        <div className="leading-none">
          <p
            className="
              text-xl
              font-black
              uppercase
              italic
              xl:text-2xl
            "
          >
            ✍️ WRITE SOMETHING
          </p>

          <p
            className="
              mt-1
              -rotate-1
              text-2xl
              font-black
              uppercase
              italic
              xl:text-4xl
            "
          >
            STUPID.
          </p>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          lg:hidden
        "
      >
        {/* Thinking */}
        <div
          className="
            mb-4
            -rotate-6
            text-4xl
            animate-bounce
            sm:mb-5
            sm:text-5xl
          "
        >
          🤨
        </div>

        {/* Loading */}
        <div className="leading-none">
          <p
            className="
              text-sm
              font-black
              uppercase
              tracking-wide
              sm:text-base
            "
          >
            WHILE WE FIND
          </p>

          <p
            className="
              mt-1
              -rotate-1
              text-lg
              font-black
              uppercase
              italic
              sm:text-xl
            "
          >
            SOME NONSENSE...
          </p>
        </div>

        {/* Arrow */}
        <div
          className="
            my-5
            text-2xl
            font-black
            animate-bounce
            sm:my-6
            sm:text-3xl
          "
        >
          ↓
        </div>

        {/* Brain */}
        <div className="leading-none">
          <p
            className="
              text-lg
              font-black
              uppercase
              sm:text-xl
            "
          >
            YOU HAVE A BRAIN.
          </p>

          <p
            className="
              mt-1
              text-base
              font-black
              uppercase
              sm:text-lg
            "
          >
            USE IT. 🧠
          </p>
        </div>

        {/* Arrow */}
        <div
          className="
            my-5
            text-2xl
            font-black
            sm:my-6
            sm:text-3xl
          "
        >
          ↓
        </div>

        {/* CTA */}
        <div className="leading-none">
          <p
            className="
              text-xl
              font-black
              uppercase
              italic
              sm:text-2xl
            "
          >
            ✍️ WRITE SOMETHING
          </p>

          <p
            className="
              mt-1
              -rotate-1
              text-2xl
              font-black
              uppercase
              italic
              sm:text-3xl
            "
          >
            STUPID.
          </p>
        </div>
      </div>
    </div>
  );
}