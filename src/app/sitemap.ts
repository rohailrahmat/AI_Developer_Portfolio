import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rohailrahmat.dev";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work/proposalcraft-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/rahnuma-gb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/assignmentforge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/verdant`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
