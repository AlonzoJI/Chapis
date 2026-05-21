import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jared Alonzo",
  description: "Product + Engineering",
};

// Synchronously tags <html> as "returning" if the visitor has been here before,
// so the loading screen can be CSS-hidden before first paint (no flash).
const visitFlagScript = `try { if (localStorage.getItem('portfolio_first_visit_v1')) document.documentElement.classList.add('returning'); } catch (e) {}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: visitFlagScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
