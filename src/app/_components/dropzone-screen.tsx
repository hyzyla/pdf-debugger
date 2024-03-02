"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdQuestionMark, MdUpload } from "react-icons/md";

import { cn } from "@/lib/utils";

const DROPZONE_COMMON_CLASSES =
  "border-2 border-gray-200 rounded p-4 bg-gray-20 flex-0 border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500 sm:w-1/2 gap-5 py-20 px-10";

function Dropzone(props: { onDrop: (file: File) => void }) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file: File = acceptedFiles[0];
      props.onDrop(file);
    },
    [props],
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

function ExampleButton(props: { onExample: () => void }) {
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

export function DropzoneScreen(props: {
  onDrop: (file: File) => void;
  onExample: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto max-w-[40rem]">
      <p className="">
        This tool allows you to inspect tree structure of a PDF file:
      </p>
      <div className="flex sm:flex-row flex-col gap-4 h-96">
        <Dropzone onDrop={props.onDrop} />
        <ExampleButton onExample={props.onExample} />
      </div>
    </div>
  );
}
