import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulsePad AI",
  description:
    "PulsePad AI is a focused to-do list built with Next.js and pnpm for ayuAtama.",
  applicationName: "PulsePad AI",
  keywords: ["Next.js to-do app", "pnpm project", "task manager", "ayuAtama"],
  openGraph: {
    title: "PulsePad AI",
    description: "A task app built with Next.js and pnpm.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulsePad AI",
    description: "A focused to-do list built with Next.js and pnpm.",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
