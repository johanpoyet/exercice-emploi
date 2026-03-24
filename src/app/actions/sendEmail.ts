"use server";

import nodemailer from "nodemailer";
import validator from "validator";

type SendEmailPayload = {
  offerTitle: string;
  adminEmails: string[];
  message: string;
};

export async function sendApplicationEmail({
  offerTitle,
  adminEmails,
  message,
}: SendEmailPayload): Promise<{ success: boolean; error?: string }> {
  const sanitizedMessage = validator.escape(message.trim());

  if (!sanitizedMessage) {
    return { success: false, error: "Le message est vide." };
  }

  const smtpConfigured =
    process.env.SMTP_USER && process.env.SMTP_PASS && adminEmails.length > 0;

  if (!smtpConfigured) {
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmails.join(", "),
      subject: `Candidature — ${offerTitle}`,
      text: sanitizedMessage,
      html: `<p>${sanitizedMessage.replaceAll("&#x0A;", "<br/>")}</p>`,
    });

    return { success: true };
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return { success: false, error: "Erreur lors de l'envoi." };
  }
}
