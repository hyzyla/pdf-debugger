import * as core from "@hyzyla/pdfjs-core";
import { AiOutlineNumber } from "react-icons/ai";
import { BsTextIndentRight } from "react-icons/bs";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { PiBracketsCurlyBold, PiBracketsSquareBold } from "react-icons/pi";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import {
  TbArrowsSplit2,
  TbBinary,
  TbExternalLink,
  TbFileUnknown,
  TbSquareLetterF,
} from "react-icons/tb";
import { VscFileBinary } from "react-icons/vsc";

import { TreeNode } from "@/lib/pdf-walker";

function TreeRowBase(props: {
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
        <props.icon
          className={`${props.iconColor} min-w-[16px] min-h-[16px]`}
        />
        {props.name && <span>{props.name}:</span>}
      </div>
      {props.value && <span className="text-gray-500">{props.value}</span>}
    </>
  );
}

export function TreeRow(props: {
  node: TreeNode;
  expanded: boolean;
  onExpandClick: (e: React.MouseEvent) => void;
  onRefClick: (e: React.MouseEvent, node: TreeNode<core.Ref>) => void;
}) {
  const { node, expanded, onExpandClick, onRefClick } = props;
  if (node.isDict()) {
    return (
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
        icon={TbExternalLink}
        iconColor="text-magenta-600"
        name={node.name}
        value={
          <div
            onClick={(e) => onRefClick(e, node)}
            className="hover:bg-gray-300 rounded"
          >
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
      <TreeRowBase
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
}
