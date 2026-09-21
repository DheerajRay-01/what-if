"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DetectiveAnimatedCharacter() {
  return (
    <div className="mx-auto  h-40 w-40 sm:h-48 sm:w-48">
      <DotLottieReact
        src="/animations/detective-search.lottie"
        autoplay
        loop
      />
    </div>
  );
}