import { PDFTreeRow } from "@/components/PDFTreeRow";
import { PDFWalker } from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";

export function PDFTree(props: { pdf: core.PDFDocument; name: string | null }) {
  const walker = new PDFWalker({
    pdf: props.pdf,
    maxDepth: 100,
  });
  const root = walker.start();

  console.log(root);

  return <PDFTreeRow node={root} />;
}
