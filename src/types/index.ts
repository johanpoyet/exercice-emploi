import type { RichTextField, ImageField } from "@prismicio/client";

export type Technology = {
  name: string;
};

export type JobOffer = {
  id: string;
  uid: string;
  title: string;
  short_description: string;
  content: RichTextField;
  technologies: Technology[];
  admin_emails: string[];
  published_at: string;
  hero_image?: ImageField;
};

export type Candidature = {
  offerId: string;
  offerUid: string;
  offerTitle: string;
  technologies: Technology[];
  message: string;
  submittedAt: string;
};
