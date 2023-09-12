import {
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
import { useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BsTextIndentRight } from "react-icons/bs";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { PiBracketsCurlyBold, PiBracketsSquareBold } from "react-icons/pi";
import {
  TbArrowsSplit2,
  TbBinary,
  TbExternalLink,
  TbFileUnknown,
  TbSquareLetterF,
} from "react-icons/tb";
import { VscFileBinary } from "react-icons/vsc";

function PDFTreeLine(props: {
  icon: React.ComponentType<any>;
  iconColor: string;
  name?: string;
  value?: React.ReactNode;
  expanded: boolean;
  node: TreeNode;
}) {
  const getExpandIcon = () => {
    if (props.node.children.length === 0) {
      return <div className="min-w-[16px] min-h-[16px]"></div>;
    }
    return props.expanded ? (
      <MdExpandMore className="min-w-[16px] min-h-[16px]" />
    ) : (
      <MdChevronRight className="min-w-[16px] min-h-[16px]" />
    );
  };
  return (
    <>
      <div className="flex items-center gap-1 h-[24px]">
        {getExpandIcon()}
        <props.icon
          className={`${props.iconColor} min-w-[16px] min-h-[16px]`}
        />
        {props.name && <span>{props.name}:</span>}
      </div>
      {props.value && <span className="text-gray-500">{props.value}</span>}
    </>
  );
}

export function PDFTreeRow(props: { node: TreeNode }) {
  const node = props.node;
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getLine = () => {
    // const isParentArray = node.parent && isArray(node.parent.obj);
    const obj = node.obj;
    if (isDict(obj)) {
      return (
        <PDFTreeLine
          icon={PiBracketsCurlyBold}
          iconColor="text-green-600"
          name={node.name}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isArray(obj)) {
      return (
        <PDFTreeLine
          icon={PiBracketsSquareBold}
          iconColor="text-purple-600"
          name={node.name}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isRef(obj)) {
      return (
        <PDFTreeLine
          icon={TbExternalLink}
          iconColor="text-magenta-600"
          name={node.name}
          value={`ref(num=${obj.num}, gen=${obj.gen})`}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isStream(obj)) {
      return (
        <PDFTreeLine
          icon={VscFileBinary}
          iconColor="text-fuchsia-600"
          name={node.name}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isStreamContent(obj)) {
      return (
        <PDFTreeLine
          icon={TbBinary}
          iconColor="text-gray-500"
          name={node.name}
          value={`[...stream contents...]`}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isName(obj)) {
      return (
        <PDFTreeLine
          icon={TbSquareLetterF}
          iconColor="text-yellow-600"
          name={node.name}
          value={`/${obj.name}`}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isNumber(obj)) {
      return (
        <PDFTreeLine
          icon={AiOutlineNumber}
          iconColor="text-blue-600"
          name={node.name}
          value={obj.toString()}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isString(obj)) {
      return (
        <PDFTreeLine
          icon={BsTextIndentRight}
          iconColor="text-red-600"
          name={node.name}
          value={obj}
          expanded={expanded}
          node={node}
        />
      );
    } else if (isBoolean(obj)) {
      return (
        <PDFTreeLine
          icon={TbArrowsSplit2}
          iconColor="text-green-600"
          name={node.name}
          value={obj.toString()}
          expanded={expanded}
          node={node}
        />
      );
    } else {
      return (
        <PDFTreeLine
          icon={TbFileUnknown}
          iconColor="text-gray-500"
          name={node.name}
          value={`[unknown]`}
          expanded={expanded}
          node={node}
        />
      );
    }
  };

  return (
    <div>
      <div
        onClick={toggleExpanded}
        className="cursor-pointer hover:bg-gray-200 px-2 rounded select-none flex gap-1 min-h-6 flex-row items-start"
      >
        {getLine()}
      </div>
      {expanded && (
        <ul className="ml-6">
          {node.children.map((child) => (
            <li key={child.name}>
              <PDFTreeRow node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
