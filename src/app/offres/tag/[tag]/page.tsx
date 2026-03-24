import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getOffersByTag } from "@/lib/prismic";
import OfferCard from "@/components/OfferCard";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  return { title: `${name} — Offres DEV` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const offers = await getOffersByTag(name);

  if (offers.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        href="/offres"
        className="inline-block bg-[#1d63ed] text-white text-sm px-4 py-1.5 mb-8 hover:bg-blue-700 transition-colors"
      >
        &lt; Voir toutes les offres
      </Link>

      <div className="flex items-start justify-between mb-1">
        <h1 className="text-3xl font-bold text-[#1a1a2e]">{name}</h1>
        <div className="flex items-center gap-2 text-[#1d63ed] text-sm mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{offers.length} offres</span>
        </div>
      </div>
      <div className="w-32 h-1 bg-[#1d63ed] mb-1" />
      <div className="w-full h-px bg-gray-300 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
