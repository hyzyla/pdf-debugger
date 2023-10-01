"use client";
import { PDFTree } from "@/components/PDFTree";
import * as core from "@hyzyla/pdfjs-core";

export function PDFViewerScreen(props: {
  pdfDocument: core.PDFDocument;
  pdfName: string | null;
}) {
  return (
    <div className="border-2 border-gray-200 rounded flex-1 flex overflow-hidden flex-row">
      <PDFTree pdf={props.pdfDocument} name={props.pdfName} />
    </div>
  );
}
