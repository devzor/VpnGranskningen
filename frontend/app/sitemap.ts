import { MetadataRoute } from "next";

const SITE_URL = "https://frontend-production-67ff.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             SITE_URL,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             `${SITE_URL}/vad-ar-vpn`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${SITE_URL}/om-sajten`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.5,
    },
  ];
}
