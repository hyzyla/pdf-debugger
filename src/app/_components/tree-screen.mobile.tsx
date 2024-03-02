import * as core from "@hyzyla/pdfjs-core";
import { MdKeyboardArrowDown } from "react-icons/md";

import { TreeNodeDetails } from "@/app/_components/tree/tree-details";
import { TreeNote } from "@/app/_components/tree/tree-node";
import { buttonVariants } from "@/components/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog";
import { TreeNode } from "@/lib/pdf-walker";
import { cn } from "@/lib/utils";

export function TreeScreenMobile(props: {
  pdf: core.PDFDocument;
  name: string | null;
  root: TreeNode;
  selected: TreeNode | null;
  onRowClick: (node: TreeNode) => void;
}) {
  return (
    <div className="flex-1 flex overflow-hidden flex-col">
      <div className="overflow-y-auto flex-1 p-2">
        <TreeNote
          node={props.root}
          onClick={props.onRowClick}
          selected={props.selected}
        />
      </div>
      {props.selected && (
        <>
          <Dialog modal={true}>
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
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
              <TreeNodeDetails node={props.selected} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
