import "./globals.css";

export const metadata = {
  title: "PulsePad AI",
  description: "A fast Next.js to-do list built end-to-end by AI for ayuAtama.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
