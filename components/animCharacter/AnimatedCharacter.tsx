import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface pageProps {
    path:string
}

export default function AnimatedCharacter({path}:pageProps) {
  return (
    <div className="mx-auto  h-40 w-40 sm:h-48 sm:w-48">
      <DotLottieReact
        src={path}
        autoplay
        loop
      />
    </div>
  );
}