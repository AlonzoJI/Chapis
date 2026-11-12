import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jared Alonzo",
  description: "Product + Engineering",
};

// Synchronously tags <html> as "returning" if the visitor has been here before,
// so the loading screen can be CSS-hidden before first paint (no flash).
const visitFlagScript = `try { if (localStorage.getItem('portfolio_first_visit_v1')) document.documentElement.classList.add('returning'); } catch (e) {}`;

// Hides the opening screen before first paint if it was already dismissed this
// session. Keep the key and class in sync with app/lib/openingSeen.ts.
const openingSeenScript = `try { if (sessionStorage.getItem('chapis_opening_seen_v1') === '1') document.documentElement.classList.add('opening-seen'); } catch (e) {}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // visitFlagScript adds a class to <html> before hydration on purpose.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: visitFlagScript }} />
        <script dangerouslySetInnerHTML={{ __html: openingSeenScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
