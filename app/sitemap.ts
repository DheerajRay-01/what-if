import type { MetadataRoute } from "next";
import WhatIf from "@/models/whatif.model";
import { connectDB } from "@/lib/connectDB";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const whatIfs = await WhatIf.find({
    status: "active",
  })
    .select("_id updatedAt")
    .sort({ updatedAt: -1 })
    .lean();

  const whatIfUrls: MetadataRoute.Sitemap = whatIfs.map((whatIf) => ({
    url: `${BASE_URL}/what-if/${whatIf._id.toString()}`,
    lastModified: whatIf.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/what-ifs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...whatIfUrls,
  ];
}