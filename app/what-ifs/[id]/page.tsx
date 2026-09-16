import type { Metadata } from "next";

import BackButton from "@/components/home/BackButton";
import ReplySection from "@/components/what-if/ReplySection";
import WhatIfDetail from "@/components/what-if/WhatIfDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface WhatIf {
  _id: string;
  content: string;
  replyCount: number;
  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };
}

const getWhatIf = async (id: string): Promise<WhatIf | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/what-if/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  if (!result.status || !result.data) {
    return null;
  }

  return result.data;
};

const createDescription = (content: string) => {
  const description = `${content} Read the reactions and terrible suggestions from other people.`;

  return description.length > 160
    ? `${description.slice(0, 157)}...`
    : description;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const whatIf = await getWhatIf(id);

  if (!whatIf) {
    return {
      title: "What If…?",
      description:
        "A place for random thoughts, crazy ideas, and terrible suggestions.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    whatIf.content.length > 55
      ? `${whatIf.content.slice(0, 52)}...`
      : whatIf.content;

  const description = createDescription(whatIf.content);

  const url = `https://whatiff.vercel.app/what-if/${id}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "article",
      url,
      title: `${title} | What If…?`,
      description,
      siteName: "What If…?",
      images: [
        {
          url: "https://whatiff.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: `${whatIf.content} | What If…?`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | What If…?`,
      description,
      images: ["https://whatiff.vercel.app/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const whatIf = await getWhatIf(id);

  if (!whatIf) {
    throw new Error("Failed to fetch What If");
  }

  return (
    <main className="px-4 pt-10 pb-20 md:pt-10">
      <div className="mx-auto w-full max-w-2xl">
        <BackButton />
      </div>

      <WhatIfDetail whatIf={whatIf} />

      <ReplySection
        whatIfId={whatIf._id}
        totalReplies={whatIf.replyCount}
      />
    </main>
  );
};

export default Page;