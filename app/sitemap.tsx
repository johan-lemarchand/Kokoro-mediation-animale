import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.kokoro-mediation-animale.fr/",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];
}
