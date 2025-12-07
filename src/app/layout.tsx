import "./globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";

import { AppPostHogProvider, PostHogPageview } from "@/app/providers";

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
        <body className="font-sans">{children}</body>
      </AppPostHogProvider>
    </html>
  );
}
