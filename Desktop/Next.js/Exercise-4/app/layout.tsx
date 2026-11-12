import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exercise 4 - Todo Dashboard",
  description: "A todo dashboard with form state, priority handling, and bulk actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
