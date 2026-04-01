import { MetadataRoute } from "next";

const SITE_URL = "https://vpngranskningen.se";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             SITE_URL,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             `${SITE_URL}/recensioner`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
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
    ...["nordvpn","mullvad","protonvpn","surfshark","expressvpn","ivpn","cyberghost","pia","windscribe","azirevpn","ovpn","adguardvpn"].map((slug) => ({
      url:             `${SITE_URL}/recensioner/${slug}`,
      lastModified:    new Date(),
      changeFrequency: "monthly" as const,
      priority:        0.8,
    })),
  ];
}
