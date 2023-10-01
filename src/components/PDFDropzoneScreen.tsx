"use client";
import { PDFTree } from "@/components/PDFTree";
import { PDFViewerScreen } from "@/components/PDFViwerScreen";
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

export function PDFDropzoneScreen(props: {
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
