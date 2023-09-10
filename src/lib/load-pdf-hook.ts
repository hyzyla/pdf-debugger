import { useEffect, useState } from "react";
import * as core from "@hyzyla/pdfjs-core";

export function usePDF(pdfBytes: Uint8Array | null) {
  const [pdf, setPdf] = useState<core.PDFDocument | null>(null);

  useEffect(() => {
    function fetchPDF() {
      if (!pdfBytes) {
        return;
      }
      const manager = new core.LocalPdfManager({
        disableAutoFetch: false,
        docBaseUrl: null,
        docId: "test",
        enableXfa: false,
        evaluatorOptions: {},
        handler: null,
        length: 0,
        password: null,
        rangeChunkSize: 0,
        source: pdfBytes,
      });
      const pdf = manager.pdfDocument;
      setPdf(pdf);
    }
    fetchPDF();
  }, [pdfBytes]);

  return pdf;
}
