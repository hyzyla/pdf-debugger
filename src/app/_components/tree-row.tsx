import * as core from "@hyzyla/pdfjs-core";
import classNames from "classnames";
import { useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { BsTextIndentRight } from "react-icons/bs";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { PiBracketsCurlyBold, PiBracketsSquareBold } from "react-icons/pi";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { TbArrowsSplit2, TbBinary, TbExternalLink, TbFileUnknown, TbSquareLetterF } from "react-icons/tb";
import { VscFileBinary } from "react-icons/vsc";

import { TreeNode } from "@/lib/pdf-walker";
import { usePDFDebuggerStore } from "@/state";

function TreeLine(props: {
  icon: React.ComponentType<any>;
  iconColor: string;
  name?: string;
  value?: React.ReactNode;
  expanded: boolean;
  node: TreeNode;
  onExpandClick: (e: React.MouseEvent) => void;
}) {
  const getExpandIcon = () => {
    if (props.node.children.length === 0) {
      return <div className="min-w-[16px] min-h-[16px]"></div>;
    }
    return (
      <div
        className="min-w-[16px] min-h-[16px] flex justify-center items-center hover:bg-gray-300 rounded"
        onClick={props.onExpandClick}
      >
        {props.expanded ? (
          <MdExpandMore className="min-w-[16px] min-h-[16px]" />
        ) : (
          <MdChevronRight className="min-w-[16px] min-h-[16px]" />
        )}
      </div>
    );
  };
  return (
    <>
      <div className="flex items-center gap-1 h-[24px]">
        {getExpandIcon()}
        <props.icon className={`${props.iconColor} min-w-[16px] min-h-[16px]`} />
        {props.name && <span>{props.name}:</span>}
      </div>
      {props.value && <span className="text-gray-500">{props.value}</span>}
    </>
  );
}

export function TreeRow(props: { node: TreeNode; selected: TreeNode | null; onClick: (node: TreeNode) => void }) {
  const expandLevel = usePDFDebuggerStore((state) => state.expandLevel());
  const node = props.node;
  const [expanded, setExpanded] = useState(node.depth < expandLevel);

  const onClick = () => {
    setExpanded(!expanded);
    props.onClick(node);
  };

  const onExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const onRefClick = (e: React.MouseEvent, node: TreeNode<core.Ref>) => {
    e.stopPropagation();

    const element = document.getElementById(`ref-${node.obj.num}-${node.obj.gen}`);
    if (!element) return;

    element.scrollIntoView();

    // highlight the element
    element.classList.add("bg-yellow-200");
    element.classList.add("bg-opacity-100");
    setTimeout(() => {
      element.classList.remove("bg-yellow-200");
      element.classList.add("bg-opacity-0");
    }, 1000);
  };

  const getLine = () => {
    // const isParentArray = node.parent && isArray(node.parent.obj);
    if (node.isDict()) {
      return (
        <TreeLine
          icon={PiBracketsCurlyBold}
          iconColor="text-green-600"
          name={node.name}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isArray()) {
      return (
        <TreeLine
          icon={PiBracketsSquareBold}
          iconColor="text-purple-600"
          name={node.name}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isRef()) {
      return (
        <TreeLine
          icon={TbExternalLink}
          iconColor="text-magenta-600"
          name={node.name}
          value={
            <div onClick={(e) => onRefClick(e, node)} className="hover:bg-gray-300 rounded">
              ref(num={node.obj.num}, gen={node.obj.gen})
            </div>
          }
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isStream()) {
      return (
        <TreeLine
          icon={VscFileBinary}
          iconColor="text-fuchsia-600"
          name={node.name}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isStreamContent()) {
      return (
        <TreeLine
          icon={TbBinary}
          iconColor="text-gray-500"
          name={node.name}
          value={`[...stream contents...]`}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isName()) {
      return (
        <TreeLine
          icon={TbSquareLetterF}
          iconColor="text-yellow-600"
          name={node.name}
          value={`/${node.obj.name}`}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isNumber()) {
      return (
        <TreeLine
          icon={AiOutlineNumber}
          iconColor="text-blue-600"
          name={node.name}
          value={node.obj.toString()}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isString()) {
      return (
        <TreeLine
          icon={BsTextIndentRight}
          iconColor="text-red-600"
          name={node.name}
          value={node.obj}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isBoolean()) {
      return (
        <TreeLine
          icon={TbArrowsSplit2}
          iconColor="text-green-600"
          name={node.name}
          value={node.obj.toString()}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else if (node.isNull()) {
      return (
        <TreeLine
          icon={RiIndeterminateCircleLine}
          iconColor="text-gray-500"
          name={node.name}
          value={`null`}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    } else {
      return (
        <TreeLine
          icon={TbFileUnknown}
          iconColor="text-gray-500"
          name={node.name}
          value={`[unknown]`}
          expanded={expanded}
          node={node}
          onExpandClick={onExpandClick}
        />
      );
    }
  };

  const ref = props.node.ref;

  const isSelected = props.selected?.path === node.path;
  return (
    <div>
      <div
        id={ref ? `ref-${ref.num}-${ref.gen}` : undefined}
        onClick={onClick}
        className={classNames(
          "cursor-pointer hover:bg-gray-200 px-2 rounded flex gap-1 min-h-6 flex-row items-start  transition-all bg-opacity-0",
          {
            "bg-gray-100": isSelected,
            "bg-opacity-100": isSelected,
          }
        )}
      >
        {getLine()}
      </div>
      {expanded && (
        <ul className="ml-6">
          {node.children.map((child) => (
            <li key={child.uniqueId}>
              <TreeRow node={child} onClick={props.onClick} selected={props.selected} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
