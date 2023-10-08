import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function NullDetails({ node }: DetailProps<null>) {
  const syntax = node.name ? `/${node.name} null` : `[... null ...]`;
  return (
    <>
      <h1>Null</h1>
      <p>A null object (null).</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Value:</h3>
      <pre>null</pre>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
