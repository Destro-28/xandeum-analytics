"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="h-20 w-full backdrop-blur-xl bg-linear-to-b from-[#09103A]/80 via-[#130691]/50 to-[#1E06FA]/5">
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="font-bold text-white">X</span>
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Xandeum Analytics
            </span>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/Destro-28/xandeum-analytics"
              target="_blank"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <Github size={18} />
            </Link>

            <Link
              href="https://x.com/Destro_28"
              target="_blank"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <Twitter size={18} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
