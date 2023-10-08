import Link from "next/link";
import { GrReturn } from "react-icons/gr";

import { Header } from "@/app/about/_comonents/header";
import { InterestButton } from "@/app/about/_comonents/intereset-button";

export default function AboutPage() {
  return (
    <main className="p-3 gap-3 flex flex-col min-h-[100dvh]">
      <Header />
      <div className="max-w-xl p-2 prose self-center py-16">
        <h1>About</h1>
        <p>
          This tool allows you to inspect the tree structure of a PDF file. It is built using the{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank">
            Mozilla/PDF.js
          </a>{" "}
          library. I made a fork of the project and extracted only the core part of it and published it as separate npm
          package{" "}
          <a href="https://github.com/hyzyla/pdf.js-core" target="_blank">
            pdf.js-core
          </a>
        </p>
        <h3>Source code</h3>
        <p>
          The source code is not available yet, but if you are interested in it, click the button below to show me your
          interest:
        </p>
        <p className="flex flex-row">
          <InterestButton />
        </p>
        <h3>Privacy</h3>
        <p>
          This tool doesn&apos;t upload your PDF files anywhere. It processes them locally in your browser. One thing
          that you must consider is that I&apos;m using Posthog analytics to track visitors, which has a screen replay
          feature.
        </p>
        <h3>Contacts</h3>
        <p>
          This app was developed by me, Yevhenii Hyzyla. You can contact me using Telegram at{" "}
          <a href="https://t.me/hyzyla">@hyzyla</a> or email at <a href="mailto:hyzyla@gmail.com">hyzyla@gmail.com</a>
        </p>
        <hr />
        <Link href="/" className="flex flex-row items-center gap-x-2">
          <GrReturn />
          Back to home
        </Link>
      </div>
    </main>
  );
}
