"use client";
import { PDFTree } from "@/components/PDFTree";
import { usePDF } from "@/lib/load-pdf-hook";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
      {...getRootProps({
        // className:
        //   "border-2 border-gray-200 rounded-lg p-4 bg-gray-20 h-full border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500",
      })}
      className="border-2 border-gray-200 rounded-lg p-4 bg-gray-20 flex-grow border-dashed flex flex-col justify-center items-center cursor-pointer text-gray-500"
    >
      <input {...getInputProps()} />
      <p>Drag drop some files here, or click to select files</p>
    </div>
  );
}

type SourceViewerScreen = "dropzone" | "loading" | "pdf";

export function SourceViewer() {
  const [screen, setScreen] = useState<SourceViewerScreen>("dropzone");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const pdf = usePDF(pdfBytes);

  useEffect(() => {
    async function laodPdf() {
      if (pdfBlob === null) return;
      const bytes = await pdfBlob.arrayBuffer();
      setPdfBytes(new Uint8Array(bytes));
      setPdfName(pdfBlob.name);
      setScreen("pdf");
    }
    laodPdf();
  }, [pdfBlob]);

  const onHeaderClick = () => {
    // clean state
    setPdfBlob(null);
    setPdfBytes(null);
    setPdfName(null);
    setScreen("dropzone");
  };

  // const pdf = usePDF();
  return (
    <main className="p-5 gap-3 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={onHeaderClick}>
        PDF debugger
      </h1>
      <div className="border-2 border-gray-200 rounded-xl p-4 flex-grow flex">
        {screen === "dropzone" && (
          <PDFDropzone
            onDrop={(file) => {
              setPdfBlob(file);
              setScreen("loading");
            }}
          />
        )}
        {screen === "loading" && <p>Loading...</p>}
        {screen === "pdf" && pdf && <PDFTree pdf={pdf} name={pdfName} />}
      </div>
    </main>
  );
}
