import Link from "next/link";

export function Header() {
  return (
    <Link className="text-2xl font-bold cursor-pointer flex" href="/">
      PDF debugger
    </Link>
  );
}
