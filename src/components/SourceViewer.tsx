"use client";
import * as core from "@hyzyla/pdfjs-core";
import { useEffect, useState } from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { PiBracketsCurlyBold, PiBracketsSquareBold } from "react-icons/pi";
import { AiOutlineNumber } from "react-icons/ai";
import { TbExternalLink, TbSquareLetterF } from "react-icons/tb";
import { BsTextIndentRight } from "react-icons/bs";
import { VscFileBinary } from "react-icons/vsc";
import { TbBinary } from "react-icons/tb";
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
export { TbExternalLink } from "react-icons/tb";
export { VscFileBinary } from "react-icons/vsc";

function usePDF() {
  const [pdf, setPdf] = useState<core.PDFDocument | null>(null);
  useEffect(() => {
    async function fetchPDF() {
      const pdfResponse = await fetch("http://localhost:3000/test.pdf");
      const pdfData = await pdfResponse.arrayBuffer();
      const manager = new core.LocalPdfManager({
        disableAutoFetch: false,
        docBaseUrl: null,
        docId: "test",
        enableXfa: false,
        evaluatorOptions: {},
        handler: null,
        length: 0,
        password: null,
        rangeChunkSize: 0,
        source: pdfData,
      });
      const pdf = manager.pdfDocument;
      pdf.parseStartXRef();
      pdf.parse();
      setPdf(pdf);
    }
    fetchPDF();
  }, []);

  return pdf;
}

function PDFRow(props: { node: TreeNode }) {
  const node = props.node;
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getIcon = () => {
    if (node.children.length === 0) {
      return <div className="w-[16px]"></div>;
    }
    return expanded ? <MdExpandMore /> : <MdChevronRight />;
  };

  const getLine = () => {
    const isParentArray = node.parent && isArray(node.parent.obj);
    const obj = node.obj;
    if (isDict(obj)) {
      return (
        <>
          <PiBracketsCurlyBold className="text-green-600" />
          {!isParentArray && <span>{node.name}</span>}
        </>
      );
    }
    if (isArray(obj)) {
      return (
        <>
          <PiBracketsSquareBold className="text-purple-600" />
          {!isParentArray && <span>{node.name}</span>}
        </>
      );
    }
    if (isRef(obj)) {
      return (
        <>
          <TbExternalLink className="text-magenta-600" />
          {!isParentArray && <span>{node.name}:</span>}
          <span className="text-gray-500">{`ref(num=${obj.num}, gen=${obj.gen})`}</span>
        </>
      );
    }
    if (isStream(obj)) {
      return (
        <>
          <VscFileBinary className="text-fuchsia-600" />
          {!isParentArray && <span>{node.name}</span>}
        </>
      );
    }
    if (isStreamContent(obj)) {
      return (
        <>
          <TbBinary className="text-gray-500" />
          <span className="text-gray-500">[...stream contents...]</span>
        </>
      );
    }
    if (isName(obj)) {
      return (
        <>
          <TbSquareLetterF className="text-yellow-600" />
          {!isParentArray && <span>{node.name}:</span>}
          <span className="text-gray-500">/{obj.name}</span>
        </>
      );
    }
    if (isNumber(obj)) {
      return (
        <>
          <AiOutlineNumber className="text-blue-600" />
          {!isParentArray && <span>{node.name}:</span>}
          <span className="text-gray-500">{obj.toString()}</span>
        </>
      );
    }
    if (isString(obj)) {
      return (
        <>
          <BsTextIndentRight className="text-red-600" />
          {!isParentArray && <span>{node.name}:</span>}
          <span className="text-gray-500">{obj}</span>
        </>
      );
    }

    if (isBoolean(obj)) {
      return (
        <>
          <span className="text-gray-500">{node.name}:</span>
          <span className="text-gray-500">{obj.toString()}</span>
        </>
      );
    }

    return (
      <span className="text-red-500">
        {node.name}: {obj?.constructor.name}
      </span>
    );
  };

  return (
    <div>
      <div
        onClick={toggleExpanded}
        className="cursor-pointer hover:bg-gray-200 px-2 rounded select-none flex items-center gap-1 h-6"
      >
        {getIcon()}
        {getLine()}
      </div>
      {expanded && (
        <ul className="ml-6">
          {node.children.map((child) => (
            <li key={child.name}>
              <PDFRow node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PDFExplorer(props: { pdf: core.PDFDocument }) {
  const walker = new PDFWalker({
    pdf: props.pdf,
    maxDepth: 100,
  });
  walker.start();

  console.log(walker.root);

  return <PDFRow node={walker.root} />;
}

export function SourceViewer() {
  const pdf = usePDF();
  return (
    <main className="m-5 gap-3 flex flex-col">
      <h1 className="text-2xl font-bold">PDF debugger</h1>
      <div className="border-2 border-gray-200 rounded-xl p-4">
        {pdf && <PDFExplorer pdf={pdf} />}
      </div>
    </main>
  );
}
