"use client";
import { PDFTree } from "@/components/PDFTree";
import { usePDF } from "@/lib/load-pdf-hook";

export function SourceViewer() {
  const pdf = usePDF();
  return (
    <main className="m-5 gap-3 flex flex-col">
      <h1 className="text-2xl font-bold">PDF debugger</h1>
      <div className="border-2 border-gray-200 rounded-xl p-4">
        {pdf && <PDFTree pdf={pdf} />}
      </div>
    </main>
  );
}
