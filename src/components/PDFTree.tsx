import { PDFTreeRowDetails } from "@/components/PDFTreeDetails";
import { PDFTreeRow } from "@/components/PDFTreeRow";
import { PDFWalker, TreeNode } from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function PDFTree(props: { pdf: core.PDFDocument; name: string | null }) {
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const walker = new PDFWalker({ pdf: props.pdf });
  const root = walker.start();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState<null | number>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      // todo: find a way to not select text when resizing
      event.preventDefault();
      event.stopPropagation();

      if (isResizing) {
        const current = sidebarRef.current;
        if (!current) return;

        const resizerX = current.getBoundingClientRect().left;
        const mouseX = event.clientX;

        const widthDiff = resizerX - mouseX;
        const sidebarWidth = sidebarRef.current?.clientWidth;
        console.log("resizing", {
          clientX: event.clientX,
          left: current.getBoundingClientRect().left,
          widthDiff,
          sidebarWidth,
        });
        setSidebarWidth(sidebarWidth ? sidebarWidth + widthDiff : null);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <>
      <div className="overflow-y-auto w-1/3 flex-1">
        <PDFTreeRow node={root} onClick={setSelected} />
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
        {selected && <PDFTreeRowDetails node={selected} />}
      </div>
    </>
  );
}
