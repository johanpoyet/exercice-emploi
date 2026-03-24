import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getOfferByUid } from "@/lib/prismic";
import { PrismicRichText } from "@prismicio/react";
import ApplicationForm from "@/components/ApplicationForm";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const offer = await getOfferByUid(uid);
  if (!offer) return {};
  return {
    title: `${offer.title} — DEV`,
    description: offer.short_description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function OfferDetailPage({ params }: Props) {
  const { uid } = await params;
  const offer = await getOfferByUid(uid);

  if (!offer) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        href="/offres"
        className="inline-block bg-[#1d63ed] text-white text-sm px-4 py-1.5 mb-8 hover:bg-blue-700 transition-colors"
      >
        &lt; Voir toutes les offres
      </Link>

      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-1">{offer.title}</h1>
      <div className="w-48 h-1 bg-[#1d63ed] mb-1" />
      <div className="w-full h-px bg-gray-300 mb-4" />

      <div className="flex items-center gap-1.5 text-[#1d63ed] text-sm mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{formatDate(offer.published_at)}</span>
      </div>

      {offer.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {offer.technologies.map((tech) => (
            <Link
              key={tech.name}
              href={`/offres/tag/${encodeURIComponent(tech.name)}`}
              className="px-3 py-1 text-sm border border-[#1d63ed] text-[#1d63ed] hover:bg-[#1d63ed] hover:text-white transition-colors"
            >
              {tech.name}
            </Link>
          ))}
        </div>
      )}

      <div className="prose max-w-none mb-12 text-[#1a1a2e]">
        <PrismicRichText field={offer.content} />
      </div>

      <ApplicationForm offer={offer} />
    </div>
  );
}
