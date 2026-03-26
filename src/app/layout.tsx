import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PGXplore — Find Your Perfect PG Near Campus",
  description:
    "Discover verified PGs near your university. Compare rooms, amenities, and rent. List your PG for free.",
};

import { Providers } from "@/components/providers/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
