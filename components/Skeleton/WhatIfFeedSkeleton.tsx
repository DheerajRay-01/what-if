const WhatIfFeedSkeleton = () => {
  return (
    <section className="mt-12">
      {/* Heading */}
      <div className="mb-8">
        <div className="h-8 w-80 animate-pulse bg-black/10" />

        <div className="mt-5 h-[3px] w-52 rotate-[-2deg] bg-black/10" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
};

const SkeletonCard = () => {
  return (
    <article className="relative border-2 border-black bg-[#fffdf5] p-7 shadow-[6px_6px_0_#000]">
      {/* little doodle */}
      <div className="absolute -top-2 right-2 h-[3px] w-14 rotate-[-5deg] bg-black/10" />

      {/* What If text */}
      <div className="space-y-3">
        <div className="h-5 w-[92%] animate-pulse bg-black/10" />
        <div className="h-5 w-[78%] animate-pulse bg-black/10" />

        {/* Randomly make some cards taller */}
        <div className="h-5 w-[55%] animate-pulse bg-black/10" />
      </div>

      {/* Bottom actions */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-5">
          <SkeletonReaction />
          <SkeletonReaction />
          <SkeletonReaction />
          <SkeletonReaction />
        </div>

        <div className="h-4 w-32 animate-pulse bg-black/10" />
      </div>
    </article>
  );
};

const SkeletonReaction = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-5 w-5 animate-pulse rounded-full bg-black/10" />
      <div className="h-4 w-3 animate-pulse bg-black/10" />
    </div>
  );
};

export default WhatIfFeedSkeleton;