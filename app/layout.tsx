import type { Metadata } from "next";
import { Orbitron  } from "next/font/google";
import "./globals.css";

const font = Orbitron({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Tetris",
  description: "next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicon.ico" className=""/>
      </head>
      <body className={font.className}>
          {children}
      </body>
    </html>
  );
}