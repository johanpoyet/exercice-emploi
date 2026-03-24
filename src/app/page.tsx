import Link from "next/link";
import Image from "next/image";
import { getLatestOffers } from "@/lib/prismic";
import OfferCard from "@/components/OfferCard";

export default async function HomePage() {
  const offers = await getLatestOffers(6);

  return (
    <div>
      <div className="relative w-full h-64">
        <Image src="/hero.jpg" alt="Hero" fill className="object-cover" priority />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-1">
          Nos dernières opportunités
        </h2>
        <div className="w-48 h-1 bg-[#1d63ed] mb-1" />
        <div className="w-full h-px bg-gray-300 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/offres"
            className="bg-[#1d63ed] text-white px-6 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Voir toutes les offres
          </Link>
        </div>
      </div>
    </div>
  );
}
