import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SocialBee - Create & Share Personalized Surprises",
  description: "Create beautiful, personalized surprise pages for your loved ones. Valentine's, Birthday, Anniversary and more!",
  keywords: ["surprise", "valentine", "birthday", "personalized", "gift", "love"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="animated-bg" />
        {children}
      </body>
    </html>
  );
}
