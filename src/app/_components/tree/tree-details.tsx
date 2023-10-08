import { ArrayDetails } from "@/app/_components/tree/tree-details/array-details";
import { BooleanDetails } from "@/app/_components/tree/tree-details/boolean-details";
import { DictDetails } from "@/app/_components/tree/tree-details/dict-details";
import { NameDetail } from "@/app/_components/tree/tree-details/name-details";
import { NullDetails } from "@/app/_components/tree/tree-details/null-details";
import { NumberDetails } from "@/app/_components/tree/tree-details/number-details";
import { RefDetails } from "@/app/_components/tree/tree-details/ref-details";
import { StreamContentDetails } from "@/app/_components/tree/tree-details/stream-content-details";
import { StreamDetails } from "@/app/_components/tree/tree-details/stream-details";
import { StringDetails } from "@/app/_components/tree/tree-details/string-details";
import { TreeNode } from "@/lib/pdf-walker";

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
