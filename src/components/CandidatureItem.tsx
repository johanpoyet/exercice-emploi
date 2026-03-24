import type { Candidature } from "@/types";

type Props = {
  candidature: Candidature;
  unavailable?: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function CandidatureItem({ candidature, unavailable = false }: Props) {
  return (
    <div className="py-4 border-b border-[#1d63ed]">
      {unavailable && (
        <p className="text-xs font-medium text-red-500 mb-2">
          ⚠ Cette offre n&apos;est plus disponible sur Prismic
        </p>
      )}
      <div className="flex items-center gap-1.5 text-[#1d63ed] text-sm mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{formatDate(candidature.submittedAt)}</span>
      </div>

      <h3 className="font-bold text-[#1a1a2e]">{candidature.offerTitle}</h3>

      {candidature.technologies.length > 0 && (
        <div className="flex items-center gap-1.5 text-sm text-[#1a1a2e] mt-0.5 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>{candidature.technologies.map((t) => t.name).join(", ")}</span>
        </div>
      )}

      <p className="text-sm text-[#1d63ed]">{candidature.message}</p>
    </div>
  );
}
