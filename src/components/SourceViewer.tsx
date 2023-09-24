"use client";
import { PDFTree } from "@/components/PDFTree";
import { loadPDFDocument } from "@/lib/load-pdf-hook";
import { usePDFDebuggerStore } from "@/state";
import * as core from "@hyzyla/pdfjs-core";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsTelegram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function PDFDropzone(props: { onDrop: (file: Blob) => void }) {
  const onDrop = useCallback(
    async (acceptedFiles: Blob[]) => {
      const file: Blob = acceptedFiles[0];
      props.onDrop(file);
    },
    [props]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-gray-200 rounded p-4 bg-gray-20 flex-1 border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500"
    >
      <input {...getInputProps()} />
      <p>Drag drop some files here, or click to select files</p>
    </div>
  );
}

function PDFDropzoneScreen(props: { onDrop: (file: Blob) => void }) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <p>
        This tool allows you to inspect the structure of a PDF file. It is built
        on top of{" "}
        <a href="https://github.com/mozilla/pdf.js" className="text-blue-700">
          mozilla/PDF.js
        </a>{" "}
        library. To get started, drag and drop or select a PDF file below.
      </p>
      <PDFDropzone onDrop={props.onDrop} />{" "}
    </div>
  );
}

function PDFViewerScreen(props: {
  pdfDocument: core.PDFDocument;
  pdfName: string | null;
}) {
  return (
    <div className="border-2 border-gray-200 rounded flex-1 flex overflow-hidden flex-row">
      <PDFTree pdf={props.pdfDocument} name={props.pdfName} />
    </div>
  );
}

function Footer() {
  return (
    <div className="flex flex-row items-center gap-3 h-[24px]">
      <a
        href="https://t.me/hyzyla"
        target="_blank"
        className="flex flex-row gap-1 items-center"
      >
        <BsTelegram className="mt-[2px]" />
        @hyzyla
      </a>
      <div className="flex flex-row gap-1 items-center">
        <MdEmail className="mt-[2px]" />
        hyzyla@gmail.com
      </div>
    </div>
  );
}

function Header(props: { onClick: () => void }) {
  return (
    <h1
      className="text-2xl font-bold cursor-pointer flex"
      onClick={props.onClick}
    >
      PDF debugger
    </h1>
  );
}

export function SourceViewer() {
  const store = usePDFDebuggerStore();

  const loadPDF = async (blob: Blob) => {
    const bytes = await blob.arrayBuffer();
    const pdfBytes = new Uint8Array(bytes);
    const pdf = loadPDFDocument(pdfBytes);
    store.onPDFLoad(pdfBytes, blob.name, pdf);
  };

  const onPDFDrop = (file: Blob) => {
    store.onPDFDrop(file);
    loadPDF(file);
  };

  const onHeaderClick = () => {
    store.reset();
  };

  return (
    <main className="p-3 gap-3 flex flex-col h-screen max-h-screen">
      <Header onClick={onHeaderClick} />
      <div className="flex-1 flex overflow-hidden">
        {store.screen === "dropzone" && (
          <PDFDropzoneScreen onDrop={onPDFDrop} />
        )}
        {store.screen === "loading" && <div>Loading...</div>}
        {store.screen === "pdf" && (
          <PDFViewerScreen
            pdfDocument={store.pdfDocument}
            pdfName={store.pdfName}
          />
        )}
      </div>
      <Footer />
    </main>
  );
}
