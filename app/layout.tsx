import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Jodi Stokes Fitness - Train. Lifestyle. Nutrition.",
  description:
    "Sustainable fitness, smart nutrition, lifestyle coaching, training programs, shop drops, and the Monday Note from Jodi Stokes.",
  applicationName: "Jodi Stokes Fitness",
  authors: [{ name: "Jodi Stokes" }],
  creator: "Jodi Stokes",
  publisher: "Jodi Stokes Fitness",
  keywords: [
    "Jodi Stokes",
    "fitness coaching",
    "strength training",
    "nutrition coaching",
    "lifestyle coaching",
    "water exercise",
  ],
  openGraph: {
    title: "Jodi Stokes Fitness - Train. Lifestyle. Nutrition.",
    description:
      "Sustainable fitness, smart nutrition, and lifestyle coaching from Jodi Stokes.",
    siteName: "Jodi Stokes Fitness",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050605",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth antialiased",
        dmSans.variable,
        syne.variable,
        caveat.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
