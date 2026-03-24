"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendApplicationEmail } from "@/app/actions/sendEmail";
import { useProfileStore } from "@/store/profileStore";
import type { JobOffer } from "@/types";

const schema = z.object({
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});

type FormData = z.infer<typeof schema>;

type Props = {
  offer: JobOffer;
};

export default function ApplicationForm({ offer }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const addCandidature = useProfileStore((s) => s.addCandidature);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const result = await sendApplicationEmail({
      offerTitle: offer.title,
      adminEmails: offer.admin_emails,
      message: data.message,
    });

    if (result.success) {
      addCandidature({
        offerId: offer.id,
        offerUid: offer.uid,
        offerTitle: offer.title,
        technologies: offer.technologies,
        message: data.message,
        submittedAt: new Date().toISOString(),
      });
      setSubmittedData(data);
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <div className="border border-dashed border-[#1d63ed] p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("message")}
          placeholder="Postuler à cette offre ..."
          rows={5}
          className="w-full border border-[#1d63ed] p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#1d63ed] text-[#1d63ed] placeholder-[#1d63ed]"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
        {serverError && (
          <p className="text-red-500 text-xs mt-1">{serverError}</p>
        )}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1d63ed] text-white text-sm px-5 py-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Envoyer
          </button>
        </div>
      </form>

      {submitted && submittedData && (
        <div className="mt-4">
          <p className="text-[#1d63ed] font-semibold text-lg">
            Merci d&apos;avoir postulé à cette offre,<br />
            nous reviendrons vers vous très prochainement!
          </p>
          <div className="mt-4 border border-gray-200 p-4 text-sm text-[#1a1a2e]">
            <p className="font-semibold text-[#1d63ed] mb-2">Récapitulatif de votre candidature :</p>
            <p><span className="font-medium">Offre :</span> {offer.title}</p>
            {offer.technologies.length > 0 && (
              <p><span className="font-medium">Technologies :</span> {offer.technologies.map((t) => t.name).join(", ")}</p>
            )}
            {offer.admin_emails.length > 0 && (
              <p><span className="font-medium">Envoyé à :</span> {offer.admin_emails.join(", ")}</p>
            )}
            <p className="mt-2"><span className="font-medium">Message :</span></p>
            <p className="whitespace-pre-wrap mt-1">{submittedData.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
