import { getPaginatedOffers, getAllTechnologies } from "@/lib/prismic";
import OfferCard from "@/components/OfferCard";
import TagPill from "@/components/TagPill";
import Pagination from "@/components/Pagination";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OffresPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const currentPage = Number.parseInt(pageParam ?? "1", 10);

  const [{ offers, totalPages, totalResults }, technologies] = await Promise.all([
    getPaginatedOffers(currentPage, 9),
    getAllTechnologies(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-3xl font-bold text-[#1a1a2e]">Offres d&apos;emploi</h1>
        <div className="flex items-center gap-2 text-[#1d63ed] text-sm mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{totalResults} offres</span>
        </div>
      </div>
      <div className="w-32 h-1 bg-[#1d63ed] mb-1" />
      <div className="w-full h-px bg-gray-300 mb-6" />

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {technologies.map((tech) => (
            <TagPill
              key={tech.name}
              name={tech.name}
              href={`/offres/tag/${encodeURIComponent(tech.name)}`}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/offres" />
        </div>
      )}
    </div>
  );
}
