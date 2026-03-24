"use server";

import { checkOffersExist } from "@/lib/prismic";

export async function checkSavedOffersAvailability(
  uids: string[]
): Promise<string[]> {
  return checkOffersExist(uids);
}
