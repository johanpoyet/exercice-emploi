import type { Metadata } from "next";
import { getLegalPage } from "@/lib/prismic";
import { PrismicRichText } from "@prismicio/react";

export const metadata: Metadata = {
  title: "Mentions légales — DEV",
};

export default async function MentionsLegalesPage() {
  const doc = await getLegalPage();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1a1a2e] mb-1">Mentions Légales</h1>
      <div className="w-40 h-1 bg-[#1d63ed] mb-1" />
      <div className="w-full h-px bg-gray-300 mb-8" />

      {doc ? (
        <div className="prose max-w-none [&_h2]:text-[#1d63ed] [&_h3]:text-[#1d63ed]">
          <PrismicRichText field={doc.data.content} />
        </div>
      ) : (
        <p className="text-gray-500">Contenu non disponible.</p>
      )}
    </div>
  );
}
