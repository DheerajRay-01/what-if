"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        mb-6
        flex items-center gap-2
        text-sm font-black uppercase
        transition-transform
        hover:-translate-x-1
      "
    >
      <ArrowLeft
        size={17}
        strokeWidth={2.5}
      />

      <span>TAKE ME BACK</span>
    </button>
  );
};

export default BackButton;