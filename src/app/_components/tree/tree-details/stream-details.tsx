import * as core from "@hyzyla/pdfjs-core";

import { STREAM_SYNTAX } from "@/app/_components/tree/tree-details/_constants";
import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function StreamDetails({ node }: DetailProps<core.BaseStream>) {
  const syntax = node.name ? `/${node.name}\n${STREAM_SYNTAX}` : STREAM_SYNTAX;
  return (
    <>
      <h1>Stream</h1>
      <p>A sequence of bytes, usually associated with a dictionary that describes its properties.</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Metadata</h3>
      <ul>
        {node.children.map((child) => {
          const key = child.name;
          if (!key) return null;

          let valueStr = child.toObjString();
          return (
            <li key={child.uniqueId} className="font-mono">
              {key}: {valueStr}
            </li>
          );
        })}
      </ul>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
