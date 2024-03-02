"use client";
import { usePostHog } from "posthog-js/react";

import { DropzoneScreen } from "@/app/_components/dropzone-screen";
import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { TreeScreen } from "@/app/_components/tree-screen";
import { loadPdfExample } from "@/lib/load-pdf-example";
import { loadPDFDocument } from "@/lib/load-pdf-hook";
import { usePDFDebuggerStore } from "@/state";

export function SourceViewer() {
  const store = usePDFDebuggerStore();
  const posthog = usePostHog();

  const loadPDF = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const pdfBytes = new Uint8Array(bytes);
    const pdf = loadPDFDocument(pdfBytes);
    store.onPDFLoad({
      pdfBytes: pdfBytes,
      pdfName: file.name,
      pdfDocument: pdf,
      isExample: false,
    });
  };

  const onPDFDrop = (file: File) => {
    store.onPDFDrop(file);
    posthog.capture("pdf_dropped", {
      file_name: file.name,
      file_size: file.size,
    });
    loadPDF(file);
  };

  const onExamplePDFDrop = async () => {
    store.onExampleClick();
    const pdfBytes = await loadPdfExample();
    const pdf = loadPDFDocument(pdfBytes);
    store.onPDFLoad({
      pdfBytes: pdfBytes,
      pdfName: "example.pdf",
      pdfDocument: pdf,
      isExample: true,
    });
  };

  const onHeaderClick = () => {
    store.reset();
  };

  return (
    <main className="p-3 gap-3 flex flex-col h-[100dvh] max-h-[100dvh]">
      <Header onClick={onHeaderClick} />
      <div className="flex-1 flex overflow-hidden">
        {store.screen === "dropzone" && (
          <DropzoneScreen onDrop={onPDFDrop} onExample={onExamplePDFDrop} />
        )}
        {store.screen === "loading" && <div>Loading...</div>}
        {store.screen === "pdf" && (
          <TreeScreen pdf={store.pdfDocument} name={store.pdfName} />
        )}
      </div>
      <Footer />
    </main>
  );
}
