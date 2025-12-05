import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { client } from "@/lib/sanity.client";
import { navigationQuery } from "@/lib/queries";
import { NavigationItem } from "@/lib/types";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch navigation server-side
  let navigation: NavigationItem[] = [];
  
  try {
    navigation = await client.fetch<NavigationItem[]>(navigationQuery) || [];
  } catch (error) {
    console.error('Error fetching navigation in layout:', error);
    // Fallback navigation
    navigation = [
      { 
        _id: '1', 
        title: 'Home', 
        label: 'Home', 
        linkType: 'page', 
        page: { _id: '', title: 'Home', slug: { current: '/' } } 
      },
    ];
  }

  return (
    <html lang="en">
      <body
        className={`${brandon.variable} ${didot.variable} ${assistant.variable} antialiased bg-white text-gray-900`}
      >
        <ConditionalLayout navigation={navigation}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
