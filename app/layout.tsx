import type { Metadata } from "next";
import { DM_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

const description =
  "Jared Alonzo (Chapis), a product manager and first-generation Guatemalan-American from Cincinnati, studying CS and Math at Ohio State.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chapis.me"),
  title: "Jared Alonzo",
  description,
  openGraph: {
    title: "Jared Alonzo",
    description,
    url: "/",
    siteName: "Jared Alonzo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jared Alonzo",
    description,
  },
};

const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

// Hides the opening screen before first paint if it was already dismissed this
// session. Keep the key and class in sync with app/lib/openingSeen.ts.
const openingSeenScript = `try { if (sessionStorage.getItem('chapis_opening_seen_v1') === '1') document.documentElement.classList.add('opening-seen'); } catch (e) {}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // openingSeenScript adds a class to <html> before hydration on purpose.
    <html lang="en" className={`${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: openingSeenScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
