import "./globals.css";

export const metadata = {
  title: "PulsePad AI | Proudly Built by AI",
  description:
    "PulsePad AI is a to-do list proudly built end-to-end by Codex with Next.js and pnpm for ayuAtama.",
  applicationName: "PulsePad AI",
  keywords: [
    "AI built",
    "AI made",
    "Next.js to-do app",
    "pnpm project",
    "Codex",
    "ayuAtama",
  ],
  openGraph: {
    title: "PulsePad AI",
    description:
      "A task app built proudly by AI, shipped fast with Next.js and pnpm.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulsePad AI",
    description:
      "A to-do list built proudly by AI without waiting on a human handoff.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
