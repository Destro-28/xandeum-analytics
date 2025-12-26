"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import XIcon from "@/app/components/icons/x-icon";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div
        className="
          h-20 w-full
          backdrop-blur-2xl
          border border-slate-700/40
          bg-linear-to-b from-slate-900 to-slate-950
        "
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
          {/* ───── Brand (Logo + Title) ───── */}
          <div className="flex items-center gap-3">
            <Image
              src="/logos/xandeum_analytics_logo.svg"
              alt="Xandeum Analytics Dashboard"
              width={39}
              height={39}
              priority
            />

            <span className="text-lg font-semibold tracking-tight text-white">
              Xandeum Analytics Dashboard
            </span>
          </div>

          {/* ───── Right: Social Links ───── */}
          <div className="flex items-center gap-8">
            <Link
              href="https://github.com/Destro-28/xandeum-analytics"
              target="_blank"
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-md text-white/70
                transition
                hover:bg-white/10 hover:text-white
              "
            >
              <Github size={18} />
            </Link>

            <Link
              href="https://x.com/Destro_28"
              target="_blank"
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-md text-white/70
                transition
                hover:bg-white/10 hover:text-white
              "
            >
              <XIcon size={18} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
