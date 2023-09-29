"use client";
import { PDFTree } from "@/components/PDFTree";
import { loadPdfExample } from "@/lib/load-pdf-example";
import { loadPDFDocument } from "@/lib/load-pdf-hook";
import { cn } from "@/lib/utils";
import { usePDFDebuggerStore } from "@/state";
import * as core from "@hyzyla/pdfjs-core";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillHeart } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { MdEmail, MdQuestionMark, MdUpload } from "react-icons/md";

const DROPZONE_COMMON_CLASSES =
  "border-2 border-gray-200 rounded p-4 bg-gray-20 flex-0 border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500 sm:w-1/2 gap-5 py-20 px-10";

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
      className={cn(DROPZONE_COMMON_CLASSES, "border-green-700")}
    >
      <input {...getInputProps()} />
      <MdUpload className="text-6xl" />
      <p>Drag and drop PDF file here</p>
    </div>
  );
}

function PDFDropzoneTryExample(props: { onExample: () => void }) {
  return (
    <div
      className={cn(DROPZONE_COMMON_CLASSES, "border-gray-400")}
      onClick={props.onExample}
    >
      <MdQuestionMark className="text-6xl" />
      <p className="text-center">... try example PDF file</p>
    </div>
  );
}

function PDFDropzoneScreen(props: {
  onDrop: (file: Blob) => void;
  onExample: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto max-w-[40rem]">
      <p className="">
        This tool allows you to inspect tree structure of a PDF file:
      </p>
      <div className="flex sm:flex-row flex-col gap-4 h-96">
        <PDFDropzone onDrop={props.onDrop} />
        <PDFDropzoneTryExample onExample={props.onExample} />
      </div>
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
    <div className="flex flex-row items-center gap-x-5 gap-y-2 flex-wrap">
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
      <div className="flex flex-row gap-1 items-center">
        <AiFillHeart className="mt-[2px]" />
        built on top of{" "}
        <a
          href="https://mozilla.github.io/pdf.js/"
          target="_blank"
          className="text-blue-500"
        >
          PDF.js
        </a>
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
  const posthog = usePostHog();

  const loadPDF = async (blob: Blob) => {
    const bytes = await blob.arrayBuffer();
    const pdfBytes = new Uint8Array(bytes);
    const pdf = loadPDFDocument(pdfBytes);
    store.onPDFLoad(pdfBytes, blob.name, pdf);
  };

  const onPDFDrop = (file: Blob) => {
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
    store.onPDFLoad(pdfBytes, "example.pdf", pdf);
  };

  const onHeaderClick = () => {
    store.reset();
  };

  return (
    <main className="p-3 gap-3 flex flex-col h-[100dvh] max-h-[100dvh]">
      <Header onClick={onHeaderClick} />
      <div className="flex-1 flex overflow-hidden">
        {store.screen === "dropzone" && (
          <PDFDropzoneScreen onDrop={onPDFDrop} onExample={onExamplePDFDrop} />
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
