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
  isExample: boolean;
}

type Screen = DropzoneScreen | LoadingScreen | PDFScreen;

type PDFDebuggerStore = Screen & {
  onPDFDrop: (blob: Blob) => void;
  onExampleClick: () => void;
  onPDFLoad: (options: {
    pdfBytes: Uint8Array;
    pdfName: string;
    pdfDocument: core.PDFDocument;
    isExample: boolean;
  }) => void;
  reset: () => void;
  expandLevel: () => number;
};

export const usePDFDebuggerStore = create<PDFDebuggerStore>()((set, get) => ({
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
  onPDFLoad: (options) => {
    set({
      screen: "pdf",
      pdfName: options.pdfName,
      pdfBytes: options.pdfBytes,
      pdfDocument: options.pdfDocument,
      isExample: options.isExample,
    });
  },
  reset: () => {
    set({
      screen: "dropzone",
    });
  },
  expandLevel: () => {
    const state = get();
    return state.screen === "pdf" && state.isExample ? 6 : 4;
  },
}));
