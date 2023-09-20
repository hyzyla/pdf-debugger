import { PDFTreeRow } from "@/components/PDFTreeRow";
import {
  PDFWalker,
  TreeNode,
  isArray,
  isBoolean,
  isDict,
  isName,
  isNumber,
  isRef,
  isStream,
  isStreamContent,
  isString,
} from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function PDFTreeRowDetails(props: { node: TreeNode }) {
  const node = props.node;
  const getDtails = () => {
    const obj = node.obj;
    if (isDict(obj)) {
      return <></>;
    } else if (isArray(obj)) {
      return <></>;
    } else if (isRef(obj)) {
      return <></>;
    } else if (isStream(obj)) {
      return <></>;
    } else if (isStreamContent(obj)) {
      return <></>;
    } else if (isName(obj)) {
      return <></>;
    } else if (isNumber(obj)) {
      return <></>;
    } else if (isString(obj)) {
      return (
        <>
          <h1 className="text-2xl font-bold">String</h1>
          <p># TODO: add description</p>

          <h3 className="text-lg font-bold">PDF Syntax:</h3>
          <pre className="p-4 bg-gray-100 rounded-lg">
            {node.name ? `/${node.name} (${obj})` : `[... (${obj}) ...]`}
          </pre>
        </>
      );
    } else if (isBoolean(obj)) {
      return <></>;
    } else {
      return <></>;
    }
  };
  return <div className="p-4">{getDtails()}</div>;
}

export function PDFTree(props: { pdf: core.PDFDocument; name: string | null }) {
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const walker = new PDFWalker({ pdf: props.pdf });
  const root = walker.start();

  return (
    <>
      <div className="w-2/3 overflow-y-auto">
        <PDFTreeRow node={root} onClick={setSelected} />
      </div>
      <div className="w-1/3 overflow-y-auto border-l-2 border-gray-200">
        {selected && <PDFTreeRowDetails node={selected} />}
      </div>
    </>
  );
  // return (
  //   <PanelGroup direction="horizontal">
  //     <Panel>
  //       ;
  //     </Panel>
  //     <PanelResizeHandle className="border-l-4 border-gray-200 cursor-col-resize border-dashed" />
  //     <Panel></Panel>
  //   </PanelGroup>
  // );
}
