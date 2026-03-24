"use client";

import Link from "next/link";
import { useProfileStore } from "@/store/profileStore";
import type { JobOffer } from "@/types";

type Props = {
  offer: JobOffer;
  unavailable?: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function OfferCard({ offer, unavailable = false }: Props) {
  const { isOfferSaved, saveOffer, removeOffer } = useProfileStore();
  const saved = isOfferSaved(offer.uid);

  function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (saved) {
      removeOffer(offer.uid);
    } else {
      saveOffer({ id: offer.id, uid: offer.uid, title: offer.title });
    }
  }

  return (
    <Link
      href={`/offres/${offer.uid}`}
      className="block bg-white p-5 border border-gray-200 hover:shadow-md transition-shadow relative"
    >
      {unavailable && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <span className="text-sm font-medium text-red-500 border border-red-300 bg-red-50 px-3 py-1">
            Cette offre n&apos;est plus disponible
          </span>
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[#1a1a2e] text-base">{offer.title}</h3>
        <button
          onClick={toggleSave}
          aria-label={saved ? "Retirer des favoris" : "Enregistrer l'offre"}
          className="shrink-0 mt-0.5 text-gray-400 hover:text-[#1d63ed] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill={saved ? "#1d63ed" : "none"}
            viewBox="0 0 24 24"
            stroke={saved ? "#1d63ed" : "currentColor"}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[#1d63ed] text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{formatDate(offer.published_at)}</span>
      </div>

      {offer.technologies.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[#1d63ed] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>{offer.technologies.map((t) => t.name).join(", ")}</span>
        </div>
      )}

      <p className="mt-3 text-sm text-[#1a1a2e] line-clamp-2">{offer.short_description}</p>
    </Link>
  );
}
