import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";


const brandon = localFont({
  src: "../../public/fonts/Brandon_Thin.otf",
  variable: "--font-brandon",
  display: "swap",
});

const didot = localFont({
  src: "../../public/fonts/Didot.otf",
  variable: "--font-didot",
  display: "swap",
});

const assistant = localFont({
  src: "../../public/fonts/Assistant-Light.ttf",
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Area Site",
  description: "A beautiful website built with Next.js and Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandon.variable} ${didot.variable} ${assistant.variable} antialiased bg-white text-gray-900`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
