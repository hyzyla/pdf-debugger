import Link from "next/link";
import { BsFillQuestionSquareFill, BsStarFill } from "react-icons/bs";

export function Footer() {
  return (
    <div className="flex flex-row gap-x-4">
      <Link href="about" className="flex flex-row items-center gap-x-2">
        <BsFillQuestionSquareFill />
        About
      </Link>
      <Link
        href="https://github.com/hyzyla/pdf-debugger"
        className="flex flex-row items-center gap-x-2"
      >
        <BsStarFill />
        Star on GitHub
      </Link>
    </div>
  );
}
