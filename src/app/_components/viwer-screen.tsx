"use client";
import * as core from "@hyzyla/pdfjs-core";

import { Tree } from "@/app/_components/tree";

export function ViewerScreen(props: { pdfDocument: core.PDFDocument; pdfName: string | null }) {
  return (
    <div className="border-2 border-gray-200 rounded flex-1 flex overflow-hidden flex-row">
      <Tree pdf={props.pdfDocument} name={props.pdfName} />
    </div>
  );
}
