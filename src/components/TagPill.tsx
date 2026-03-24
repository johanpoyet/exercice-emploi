"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  name: string;
  href: string;
  active?: boolean;
};

export default function TagPill({ name, href, active }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-block px-3 py-1 text-sm border transition-colors",
        active
          ? "bg-[#0d1b3e] text-white border-[#0d1b3e]"
          : "bg-white text-[#1d63ed] border-[#1d63ed] hover:bg-[#1d63ed] hover:text-white"
      )}
    >
      {name}
    </Link>
  );
}
