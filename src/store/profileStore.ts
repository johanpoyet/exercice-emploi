"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Candidature } from "@/types";

type SavedOffer = {
  id: string;
  uid: string;
  title: string;
};

type ProfileStore = {
  savedOffers: SavedOffer[];
  candidatures: Candidature[];
  saveOffer: (offer: SavedOffer) => void;
  removeOffer: (uid: string) => void;
  isOfferSaved: (uid: string) => boolean;
  addCandidature: (candidature: Candidature) => void;
  removeStaleSavedOffers: (existingUids: string[]) => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      savedOffers: [],
      candidatures: [],

      saveOffer: (offer) =>
        set((s) => ({
          savedOffers: s.savedOffers.some((o) => o.uid === offer.uid)
            ? s.savedOffers
            : [...s.savedOffers, offer],
        })),

      removeOffer: (uid) =>
        set((s) => ({
          savedOffers: s.savedOffers.filter((o) => o.uid !== uid),
        })),

      isOfferSaved: (uid) => get().savedOffers.some((o) => o.uid === uid),

      addCandidature: (candidature) =>
        set((s) => ({ candidatures: [candidature, ...s.candidatures] })),

      removeStaleSavedOffers: (existingUids) =>
        set((s) => ({
          savedOffers: s.savedOffers.filter((o) => existingUids.includes(o.uid)),
        })),
    }),
    {
      name: "dev-profile",
    }
  )
);
