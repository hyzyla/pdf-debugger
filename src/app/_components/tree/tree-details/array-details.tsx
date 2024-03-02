import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function ArrayDetails({ node }: DetailProps<any[]>) {
  const syntax = node.name ? `/${node.name} [ ... ]` : `[ ... ]`;
  return (
    <>
      <h1>Array</h1>
      <p>
        Ordered collections of objects, enclosed in square brackets (e.g., [1 2
        3]).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Length:</h3>
      <pre>{node.obj.length}</pre>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
