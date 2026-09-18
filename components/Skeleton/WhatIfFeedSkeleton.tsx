import WhatIfCardSkeleton from "./WhatIfCardSkeleton";

export default function WhatIfFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <WhatIfCardSkeleton key={index} />
      ))}
    </div>
  );
}