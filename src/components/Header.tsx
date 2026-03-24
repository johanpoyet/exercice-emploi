"use client";

import Link from "next/link";
import { useProfileStore } from "@/store/profileStore";

export default function Header() {
  const savedOffers = useProfileStore((s) => s.savedOffers);
  const count = savedOffers.length;

  return (
    <header className="bg-[#0d1b3e] text-white">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-widest">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16v16H4V4z" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          DEV
        </Link>

        <nav className="flex items-center gap-3">
          {count > 0 ? (
            <>
              <Link href="/profil" className="flex items-center gap-1.5 text-sm">
                <span>{count}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </Link>
              <Link href="/profil" aria-label="Mon profil">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Link>
            </>
          ) : (
            <Link href="/profil" aria-label="Mon profil">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          )}
        </nav>
      </div>
      <div className="h-0.5 bg-[#1d63ed]" />
    </header>
  );
}
