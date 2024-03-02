import * as core from "@hyzyla/pdfjs-core";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function NameDetail({ node }: DetailProps<core.Name>) {
  const syntax = node.name
    ? `/${node.name} /${node.obj.name}`
    : `[... /${node.obj.name} ...]`;
  return (
    <>
      <h1>Name</h1>
      <p>A identifier that begins with a / (e.g., /Name).</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Value:</h3>
      <pre>{node.obj.name.replace(/^\//, "")}</pre>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
