"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";
import { checkSavedOffersAvailability } from "@/app/actions/checkOffers";
import OfferCard from "@/components/OfferCard";
import CandidatureItem from "@/components/CandidatureItem";

export default function ProfileClient() {
  const { savedOffers, candidatures } = useProfileStore();
  const [unavailableUids, setUnavailableUids] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allUids = [
      ...savedOffers.map((o) => o.uid),
      ...candidatures.map((c) => c.offerUid),
    ];
    const uniqueUids = [...new Set(allUids)];
    if (uniqueUids.length === 0) return;

    checkSavedOffersAvailability(uniqueUids).then((existingUids) => {
      const unavailable = uniqueUids.filter((uid) => !existingUids.includes(uid));
      setUnavailableUids(new Set(unavailable));
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#1a1a2e] mb-1">Bienvenue</h1>
      <div className="w-24 h-1 bg-[#1d63ed] mb-1" />
      <div className="w-full h-px bg-gray-300 mb-10" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-[#1d63ed] mb-6">Offres enregistrées</h2>
        {savedOffers.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune offre enregistrée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedOffers.map((saved) => (
              <OfferCard
                key={saved.uid}
                unavailable={unavailableUids.has(saved.uid)}
                offer={{
                  id: saved.id,
                  uid: saved.uid,
                  title: saved.title,
                  short_description: "",
                  content: [],
                  technologies: [],
                  admin_emails: [],
                  published_at: new Date().toISOString(),
                }}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1d63ed] mb-6">
          Historique des candidatures
        </h2>
        {candidatures.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune candidature envoyée.</p>
        ) : (
          <div>
            {candidatures.map((c) => (
              <CandidatureItem
                key={`${c.offerUid}-${c.submittedAt}`}
                candidature={c}
                unavailable={unavailableUids.has(c.offerUid)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
