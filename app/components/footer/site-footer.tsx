"use client"

import { Youtube, Facebook } from "lucide-react"
import XIcon from "@/app/components/icons/x-icon"
import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full border-t border-slate-700/40 bg-linear-to-b from-slate-900 to-slate-950">
      <div className="mx-auto h-82.75 max-w-full px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl gap-28">
          {/* ───────────── LEFT ───────────── */}
          <div className="w-150 space-y-8">
            {/* Block 1 */}
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/xandeum_analytics_logo.svg"
                  alt="Xandeum Analytics Dashboard"
                  width={39}
                  height={39}
                  priority
                />
                <h2 className="text-2xl font-bold">
                  Xandeum Analytics Dashboard
                </h2>
              </div>

              <p className="mt-2 text-base text-white/90">
                An interactive analytical dashboard which provides comprehensive
                insights for Xandeum pNodes through pRPC calls.
              </p>
            </div>

            {/* Block 2 */}
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/xandeum_logo.svg"
                  alt="Xandeum Network"
                  width={39}
                  height={39}
                />
                <h2 className="text-2xl font-bold">Xandeum Network</h2>
              </div>

              <p className="mt-2 text-base text-white/90">
                Xandeum is a groundbreaking scalable storage platform transforming
                Solana with scalable, secure, and smart contract-native solutions
                for data-intensive Web3 applications.
              </p>
            </div>

            {/* Block 3 */}
            <div className="text-base">
              <span className="text-[#C4C2C2]">Powered By </span>
              <span className="font-bold text-white">Xandeum pRPC</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/30" />

          {/* ───────────── MIDDLE ───────────── */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">Links</h3>
            <div className="mt-6 space-y-2 text-base text-white/90">
              <a
                href="https://www.xandeum.network/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Xandeum Network
              </a>
              <a
                href="https://www.xandeum.network/docs"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Xandeum Docs
              </a>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold">Socials</h3>
              <div className="mt-5 flex items-center gap-4">
                <a
                  href="https://x.com/Xandeum?s=20"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-2 hover:bg-white/10"
                >
                  <XIcon size={20} />
                </a>

                <a
                  href="https://www.youtube.com/@BlockchainBernie"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-2 hover:bg-white/10"
                >
                  <Youtube size={20} />
                </a>

                <a
                  href="https://www.facebook.com/xandeumlabs"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-2 hover:bg-white/10"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/30" />

          {/* ───────────── RIGHT ───────────── */}
          <div>
            <h3 className="text-2xl font-bold">Developer</h3>
            <a
              href="https://github.com/Destro-28/xandeum-analytics"
              target="_blank"
              rel="noreferrer"
              className="mt-6 block text-base text-white/90 hover:text-white"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
