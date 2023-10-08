import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { AppPostHogProvider, PostHogPageview } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF debugger",
  description: "A tool to debug PDF files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <AppPostHogProvider>
        <body className={inter.className}>{children}</body>
      </AppPostHogProvider>
    </html>
  );
}
