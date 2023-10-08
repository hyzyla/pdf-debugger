import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function NumberDetails({ node }: DetailProps<number>) {
  const syntax = node.name ? `/${node.name} ${node.obj}` : `[... ${node.obj} ...]`;
  return (
    <>
      <h1>Number</h1>
      <p>Integer numbers (e.g., 123) or floating-point numbers (e.g., 3.141).</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Value:</h3>
      <pre>{node.obj.toString()}</pre>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
