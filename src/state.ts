import { create } from "zustand";
import * as core from "@hyzyla/pdfjs-core";

interface BaseScreen {
  screen: string;
}

interface DropzoneScreen extends BaseScreen {
  screen: "dropzone";
}

interface LoadingScreen extends BaseScreen {
  screen: "loading";
  pdfBlob: Blob;
  pdfName: string;
}

interface PDFScreen extends BaseScreen {
  screen: "pdf";
  pdfName: string;
  pdfBytes: Uint8Array;
  pdfDocument: core.PDFDocument;
}

type Screen = DropzoneScreen | LoadingScreen | PDFScreen;

type PDFDebuggerStore = Screen & {
  onPDFDrop: (blob: Blob) => void;
  onExampleClick: () => void;
  onPDFLoad: (
    pdfBytes: Uint8Array,
    pdfName: string,
    pdfDocument: core.PDFDocument
  ) => void;
  reset: () => void;
};

export const usePDFDebuggerStore = create<PDFDebuggerStore>()((set) => ({
  screen: "dropzone",
  onPDFDrop: (blob) => {
    set({
      screen: "loading",
      pdfBlob: blob,
      pdfName: blob.name,
    });
  },
  onExampleClick: () => {
    set({
      screen: "loading",
      pdfBlob: new Blob(),
      pdfName: "example.pdf",
    });
  },
  onPDFLoad: (pdfBytes, pdfName, pdfDocument) => {
    set({
      screen: "pdf",
      pdfName: pdfName,
      pdfBytes: pdfBytes,
      pdfDocument: pdfDocument,
    });
  },
  reset: () => {
    set({
      screen: "dropzone",
    });
  },
}));
