"use client";
import { PDFTree } from "@/components/PDFTree";
import { loadPDFDocument } from "@/lib/load-pdf-hook";
import { usePDFDebuggerStore } from "@/state";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as core from "@hyzyla/pdfjs-core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { BsTelegram } from "react-icons/bs";
import { MdAlternateEmail, MdEmail } from "react-icons/md";

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
      className="border-2 border-gray-200 rounded-lg p-4 bg-gray-20 flex-1 border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500"
    >
      <input {...getInputProps()} />
      <p>Drag drop some files here, or click to select files</p>
    </div>
  );
}

function PDFViewerScreen(props: {
  pdfDocument: core.PDFDocument;
  pdfName: string | null;
}) {
  return <PDFTree pdf={props.pdfDocument} name={props.pdfName} />;
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
    <main className="p-5 gap-3 flex flex-col h-screen max-h-screen">
      <h1
        className="text-2xl font-bold cursor-pointer flex"
        onClick={onHeaderClick}
      >
        PDF debugger
      </h1>
      <div className="border-2 border-gray-200 rounded-xl flex-1 flex overflow-hidden flex-row">
        {store.screen === "dropzone" && <PDFDropzone onDrop={onPDFDrop} />}
        {store.screen === "loading" && <div>Loading...</div>}
        {store.screen === "pdf" && (
          <PDFViewerScreen
            pdfDocument={store.pdfDocument}
            pdfName={store.pdfName}
          />
        )}
      </div>
      <div className="flex flex-row gap-4">
        <a
          href="https://t.me/hyzyla"
          target="_blank"
          className="flex flex-row gap-1 items-center"
        >
          <BsTelegram className="text-xl" />
          <div>@hyzyla</div>
        </a>
        <div className="flex flex-row gap-1 items-center">
          <MdEmail className="text-xl" />
          <div>hyzyla@gmail.com</div>
        </div>
      </div>
    </main>
  );
}
