"use client";

import { useState } from "react";
import { Search, Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Practice", href: "/practice" },
  { label: "Interview Mode", href: "/interview" },
  { label: "Progress", href: "/progress" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-surface border-b border-custom h-13 flex items-center px-5 gap-0">

      {/* Logo */}
      <Link
        href="/"
        className="font-mono text-[0.9rem] font-medium text-primary tracking-wider mr-7 whitespace-nowrap select-none"
      >
        MONOLITH_DSA
      </Link>

      {/* Nav Links */}
      <div className="flex items-center flex-1">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                relative px-3.5 h-13 flex items-center text-sm whitespace-nowrap
                transition-colors duration-150 select-none
                ${isActive
                  ? "text-white font-medium after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-primary after:rounded-t-sm"
                  : "text-muted hover:text-white"
                }
              `}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1.5 ml-auto">

        {/* Search */}
        <div className="flex items-center gap-2 bg-bg border border-custom rounded-sm px-2.5 h-8 w-48 focus-within:border-primary transition-colors duration-150">
          <Search className="text-muted shrink-0" size={13} strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Jump to problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-muted placeholder:text-muted text-[0.8rem] w-full font-body"
          />
          <div className="flex items-center gap-px shrink-0">
            <kbd className="bg-border text-muted font-mono text-[0.65rem] px-1 py-px rounded-[3px] leading-snug">⌘</kbd>
            <kbd className="bg-border text-muted font-mono text-[0.65rem] px-1 py-px rounded-[3px] leading-snug">K</kbd>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Bell */}
        <button className="relative w-8 h-8 rounded-sm flex items-center justify-center text-muted hover:bg-white/6 hover:text-white transition-all duration-150">
          <Bell size={17} strokeWidth={2} />
          <span className="absolute top-1.25 right-1.25 w-1.5 h-1.5 bg-primary rounded-full border-[1.5px] border-surface" />
        </button>

        {/* Settings */}
        <button className="w-8 h-8 rounded-sm flex items-center justify-center text-muted hover:bg-white/6 hover:text-white transition-all duration-150">
          <Settings size={17} strokeWidth={2} />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary to-[#1d6bd3] flex items-center justify-center text-[0.7rem] font-semibold text-white border-[1.5px] border-custom hover:border-primary transition-colors duration-150 cursor-pointer ml-1">
          U
        </div>

      </div>
    </nav>
  );
}