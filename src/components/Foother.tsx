import Link from "next/link";
import { BsFillQuestionSquareFill } from "react-icons/bs";

export function Footer() {
  return (
    <Link href="about" className="flex flex-row items-center gap-x-2">
      <BsFillQuestionSquareFill />
      About
    </Link>
  );
}
