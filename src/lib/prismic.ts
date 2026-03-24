import { createClient } from "../../prismicio";
import type { JobOffer, Technology } from "@/types";
import * as prismic from "@prismicio/client";

function mapOffer(doc: prismic.PrismicDocument): JobOffer {
  return {
    id: doc.id,
    uid: doc.uid ?? doc.id,
    title: typeof doc.data.title === "string"
      ? doc.data.title
      : prismic.asText(doc.data.title) ?? "",
    short_description: (doc.data.short_description as string) ?? "",
    content: doc.data.content,
    technologies: (doc.data.technologies ?? []).map(
      (item: { name: prismic.KeyTextField }) => ({
        name: item.name ?? "",
      })
    ),
    admin_emails: (doc.data.admin_emails ?? []).map(
      (item: { email: prismic.KeyTextField }) => item.email ?? ""
    ),
    published_at: doc.first_publication_date ?? new Date().toISOString(),
    hero_image: doc.data.hero_image,
  };
}

export async function getAllOffers(): Promise<JobOffer[]> {
  const client = createClient();
  const docs = await client.getAllByType("offre_emploi", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });
  return docs.map(mapOffer);
}

export async function getLatestOffers(count = 6): Promise<JobOffer[]> {
  const client = createClient();
  const response = await client.getByType("offre_emploi", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    pageSize: count,
  });
  return response.results.map(mapOffer);
}

export async function getOfferByUid(uid: string): Promise<JobOffer | null> {
  const client = createClient();
  try {
    const doc = await client.getByUID("offre_emploi", uid);
    return mapOffer(doc);
  } catch {
    return null;
  }
}

export async function getOffersByTag(tag: string): Promise<JobOffer[]> {
  const client = createClient();
  const docs = await client.getAllByType("offre_emploi", {
    filters: [prismic.filter.at("my.offre_emploi.technologies.name", tag)],
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });
  return docs.map(mapOffer);
}

export async function getPaginatedOffers(
  page = 1,
  pageSize = 9
): Promise<{ offers: JobOffer[]; totalPages: number; totalResults: number }> {
  const client = createClient();
  const response = await client.getByType("offre_emploi", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    page,
    pageSize,
  });
  return {
    offers: response.results.map(mapOffer),
    totalPages: response.total_pages,
    totalResults: response.total_results_size,
  };
}

export async function getAllTechnologies(): Promise<Technology[]> {
  const offers = await getAllOffers();
  const seen = new Set<string>();
  const techs: Technology[] = [];
  for (const offer of offers) {
    for (const tech of offer.technologies) {
      if (tech.name && !seen.has(tech.name)) {
        seen.add(tech.name);
        techs.push(tech);
      }
    }
  }
  return techs;
}

export async function checkOffersExist(uids: string[]): Promise<string[]> {
  if (uids.length === 0) return [];
  const client = createClient();
  const docs = await client.getAllByUIDs("offre_emploi", uids);
  return docs.map((d) => d.uid ?? d.id);
}

export async function getLegalPage() {
  const client = createClient();
  try {
    return await client.getSingle("mentions_legales");
  } catch {
    return null;
  }
}
