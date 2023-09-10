import { PDFTreeRow } from "@/components/PDFTreeRow";
import { PDFWalker } from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";

export function PDFTree(props: { pdf: core.PDFDocument }) {
  const walker = new PDFWalker({
    pdf: props.pdf,
    maxDepth: 100,
  });
  walker.start();

  console.log(walker.root);

  return <PDFTreeRow node={walker.root} />;
}
