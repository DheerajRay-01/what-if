import WhatIfFeedSkeleton from '@/components/Skeleton/WhatIfCardSkeleton'
import React from 'react'

const loading = () => {
  return (
     <main className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <WhatIfFeedSkeleton/>
     </main>
  )
}

export default loading