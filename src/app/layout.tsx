import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "At Ours — Plans that feel like us",
  description: "Describe and review the basic shape of your group plan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
