import { useEffect, useState } from "react";
import * as core from "@hyzyla/pdfjs-core";

export function usePDF() {
  const [pdf, setPdf] = useState<core.PDFDocument | null>(null);
  useEffect(() => {
    async function fetchPDF() {
      const pdfResponse = await fetch("http://localhost:3000/test.pdf");
      const pdfData = await pdfResponse.arrayBuffer();
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
        source: pdfData,
      });
      const pdf = manager.pdfDocument;
      setPdf(pdf);
    }
    fetchPDF();
  }, []);

  return pdf;
}
