import * as core from "@hyzyla/pdfjs-core";
import { useState } from "react";

import { TreeNodeDetails } from "@/app/_components/tree/tree-details";
import { TreeNote } from "@/app/_components/tree/tree-node";
import { TreeScreenMobile } from "@/app/_components/tree-screen.mobile";
import { PDFWalker, TreeNode } from "@/lib/pdf-walker";
import { useMediaQuery } from "@/lib/use-media-query-hook";
import { useResizer } from "@/lib/use-resizer-hook";

export function TreeScreen(props: {
  pdf: core.PDFDocument;
  name: string | null;
}) {
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const isSmScreen = useMediaQuery("(max-width: 640px)");
  const walker = new PDFWalker({ pdf: props.pdf });
  const root = walker.start();

  const onRowClick = (node: TreeNode) => {
    if (selected?.path === node.path) {
      setSelected(null); // deselect
    } else {
      setSelected(node);
    }
  };

  const { sidebarRef, startResizing, sidebarWidth } = useResizer();

  if (isSmScreen) {
    return (
      <TreeScreenMobile
        pdf={props.pdf}
        name={props.name}
        root={root}
        selected={selected}
        onRowClick={onRowClick}
      />
    );
  }

  return (
    <div className="border-2 border-gray-200 rounded flex-1 flex overflow-hidden flex-row">
      <div className="overflow-y-auto sm:w-1/3 flex-1 p-2">
        <TreeNote node={root} onClick={onRowClick} selected={selected} />
      </div>
      <div
        className="min-w-[6px] cursor-col-resize border-l-2 border-gray-200"
        onMouseDown={startResizing}
      />
      <div
        className="overflow-y-auto"
        ref={sidebarRef}
        style={{ width: sidebarWidth ?? "33%" }}
      >
        {selected && <TreeNodeDetails node={selected} />}
      </div>
    </div>
  );
}
