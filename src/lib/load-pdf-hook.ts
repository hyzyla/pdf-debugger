import * as core from "@hyzyla/pdfjs-core";

export function loadPDFDocument(pdfBytes: Uint8Array): core.PDFDocument {
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
  return manager.pdfDocument;
}
