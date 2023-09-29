import { PDFTreeRowDetails } from "@/components/PDFTreeDetails";
import { PDFTreeRow } from "@/components/PDFTreeRow";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PDFWalker, TreeNode } from "@/lib/pdf-walker";
import { useMediaQuery } from "@/lib/use-media-query-hook";
import { cn } from "@/lib/utils";
import * as core from "@hyzyla/pdfjs-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function useResizer() {
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

  return { sidebarRef, isResizing, startResizing, stopResizing, sidebarWidth };
}

export function PDFTree(props: { pdf: core.PDFDocument; name: string | null }) {
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

  if (isSmScreen)
    return (
      <div className="flex-1 flex overflow-hidden flex-col">
        <div className="overflow-y-auto flex-1 p-2">
          <PDFTreeRow node={root} onClick={onRowClick} selected={selected} />
        </div>
        {selected && (
          <>
            <Dialog modal={true}>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "default", size: "default" })
                )}
              >
                <MdKeyboardArrowDown className="mr-2" />
                Show details
              </DialogTrigger>
              <DialogContent
                className={
                  "lg:max-w-screen-lg overflow-y-scroll max-h-[100dvh] min-h-[100dvh]"
                }
              >
                <PDFTreeRowDetails node={selected} />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    );

  return (
    <>
      <div className="overflow-y-auto sm:w-1/3 flex-1 p-2">
        <PDFTreeRow node={root} onClick={onRowClick} selected={selected} />
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
