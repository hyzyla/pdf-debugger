import { useCallback, useEffect, useRef, useState } from "react";

export function useResizer() {
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
    [isResizing],
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
