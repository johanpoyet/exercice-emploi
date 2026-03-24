import type { Metadata } from "next";
import ProfileClient from "@/components/ProfileClient";

export const metadata: Metadata = {
  title: "Mon profil — DEV",
};

export default function ProfilPage() {
  return <ProfileClient />;
}
