import * as core from "@hyzyla/pdfjs-core";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function DictDetails({ node }: DetailProps<core.Dict>) {
  let syntax = "<< ... >>";
  if (node.name) {
    syntax = `/${node.name} << ... >>`;
  } else if (node.parent?.isArray()) {
    syntax = `[... << ... >> ...]`;
  }
  return (
    <>
      <h1>Dictionary</h1>
      <p>
        Collections of key-value pairs, enclosed in double angle brackets (e.g.,
        &lt;&lt; /Type /Example /Subtype /Type1 &gt;&gt;).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Keys:</h3>
      <ul>
        {node.obj.getKeys().map((key) => (
          <li key={key} className="font-mono">
            {key}
          </li>
        ))}
      </ul>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
