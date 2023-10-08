import * as core from "@hyzyla/pdfjs-core";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";
import { ArrayDetails } from "@/app/_components/tree/tree-details/array-details";
import { BooleanDetails } from "@/app/_components/tree/tree-details/boolean-details";
import { DictDetails } from "@/app/_components/tree/tree-details/dict-details";
import { NullDetails } from "@/app/_components/tree/tree-details/null-details";
import { NumberDetails } from "@/app/_components/tree/tree-details/number-details";
import { RefDetails } from "@/app/_components/tree/tree-details/ref-details";
import { StreamContentDetails } from "@/app/_components/tree/tree-details/stream-content-details";
import { StreamDetails } from "@/app/_components/tree/tree-details/stream-details";
import { StringDetails } from "@/app/_components/tree/tree-details/string-details";
import { TreeNode } from "@/lib/pdf-walker";

function NameDetail({ node }: DetailProps<core.Name>) {
  const syntax = node.name ? `/${node.name} /${node.obj.name}` : `[... /${node.obj.name} ...]`;
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

export function TreeNodeDetails(props: { node: TreeNode }) {
  const node = props.node;
  const getDtails = () => {
    if (node.isDict()) {
      return <DictDetails node={node} />;
    } else if (node.isArray()) {
      return <ArrayDetails node={node} />;
    } else if (node.isRef()) {
      return <RefDetails node={node} />;
    } else if (node.isStream()) {
      return <StreamDetails node={node} />;
    } else if (node.isStreamContent()) {
      return <StreamContentDetails node={node} />;
    } else if (node.isName()) {
      return <NameDetail node={node} />;
    } else if (node.isNumber()) {
      return <NumberDetails node={node} />;
    } else if (node.isString()) {
      return <StringDetails node={node} />;
    } else if (node.isBoolean()) {
      return <BooleanDetails node={node} />;
    } else if (node.isNull()) {
      return <NullDetails node={node} />;
    } else {
      return <div>Unknown type</div>;
    }
  };
  return (
    // break words in pre
    <div className="p-2 prose prose-pre:whitespace-pre-wrap prose-pre:break-words">{getDtails()}</div>
  );
}
