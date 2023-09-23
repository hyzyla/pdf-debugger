import { PDFTreeRowDetails } from "@/components/PDFTreeDetails";
import { PDFTreeRow } from "@/components/PDFTreeRow";
import { PDFWalker, TreeNode } from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";
import { useState } from "react";

export function PDFTree(props: { pdf: core.PDFDocument; name: string | null }) {
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const walker = new PDFWalker({ pdf: props.pdf });
  const root = walker.start();

  return (
    <>
      <div className="w-2/3 overflow-y-auto">
        <PDFTreeRow node={root} onClick={setSelected} />
      </div>
      <div className="w-1/3 overflow-y-auto border-l-2 border-gray-200">
        {selected && <PDFTreeRowDetails node={selected} />}
      </div>
    </>
  );
}
