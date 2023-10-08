"use client";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { BiShow, BiSolidHeart } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function InterestButton() {
  const posthog = usePostHog();
  const [isClicked, setIsClicked] = useState(false);
  const onInterestClick = () => {
    setIsClicked(true);
    posthog.capture("interest_button_clicked");
  };
  return (
    <Button
      onClick={onInterestClick}
      variant="secondary"
      size="sm"
      className={cn(
        "flex flex-row items-center gap-2",
        isClicked && "text-green-700 border-green-700 border"
      )}
    >
      {isClicked ? <BiSolidHeart /> : <BiShow />}
      {isClicked ? "Thank you!" : "Show interest"}
    </Button>
  );
}
