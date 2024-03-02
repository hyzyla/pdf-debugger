import { CSSProperties, useState } from "react";
import { MdCopyAll, MdExpand } from "react-icons/md";

import { Button } from "@/components/button";

export const CodeBlock = (props: { code: string }) => {
  const [isExpanded, setExpanded] = useState(false);

  const onCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigator.clipboard.writeText(props.code);
    // make button green for 1s
    const target = e.currentTarget;
    target.classList.add(
      "border-green-200",
      "text-green-700",
      "hover:border-green-200",
      "hover:text-green-700",
    );
    setTimeout(() => {
      target.classList.remove(
        "border-green-200",
        "text-green-700",
        "hover:border-green-200",
        "hover:text-green-700",
      );
    }, 1000);
  };

  const blockStyle: CSSProperties = isExpanded
    ? { maxHeight: "none" }
    : { maxHeight: "400px", overflowY: "auto" };

  return (
    <div className="flex flex-col" style={blockStyle}>
      <pre
        className="mt-0 mb-1"
        style={{
          overflowWrap: "anywhere",
        }}
      >
        {props.code}
      </pre>
      <div className="flex gap-2 self-end">
        <Button
          onClick={onCopy}
          variant="outline"
          size="sm"
          className="transition-all gap-1"
        >
          <MdCopyAll />
          Copy
        </Button>
        <Button
          onClick={() => setExpanded(!isExpanded)}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <MdExpand />

          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
};
