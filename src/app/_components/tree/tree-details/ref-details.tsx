import * as core from "@hyzyla/pdfjs-core";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function RefDetails({ node }: DetailProps<core.Ref>) {
  const ref = `${node.obj.num} ${node.obj.gen} R`;
  const syntax = node.name ? `/${node.name} ${ref}` : `[... ${ref} ...]`;
  return (
    <>
      <h1>Reference</h1>
      <p>It&apos;s a reference to an indirect object in the PDF file (like a link)</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Value:</h3>
      <pre>{ref}</pre>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
