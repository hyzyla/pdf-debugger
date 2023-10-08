import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function BooleanDetails({ node }: DetailProps<boolean>) {
  const syntax = node.name ? `/${node.name} ${node.obj}` : `[... ${node.obj} ...]`;
  return (
    <>
      <h1>Boolean</h1>
      <p>True or false values (true or false).</p>
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
