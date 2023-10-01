"use client";
import { Header as BaseHeader } from "@/components/Header";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const onHeaderClick = () => {
    router.push("/");
  };
  return <BaseHeader onClick={onHeaderClick} />;
}
