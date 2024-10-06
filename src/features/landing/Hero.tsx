"use client";

import { EditableText } from "@/features/editable/EditableText";
import { EditableImage } from "@/features/editable/EditableImage";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import AccordionList from "@/features/commmon/AccordionList";
import { useSession } from "next-auth/react";
import { useEditableContentManager } from "@/hooks/useEditableContentManager";

export const Hero = () => {
  const { data: session } = useSession();
  const isEditable = !!session;

  const contentIds = [
    "hero-logo",
    "hero-title",
    "hero-description",
    "hero-triadique-description",
    "hero-animal-mediateur-title",
    "hero-animal-mediateur-description",
    "hero-beneficiaire-title",
    "hero-beneficiaire-description",
    "hero-ima-title",
    "hero-ima-description",
    "hero-referent-title",
    "hero-referent-description",
    "hero-triangle"
  ];

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
  } = useEditableContentManager(contentIds);

  const noop = () => {};

  return (
    <main className="relative m-auto my-12 mt-32 flex w-full max-w-7xl flex-col gap-8 px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-6 xl:gap-8">
          <EditableImage
            src="/images/logo-compressé.webp"
            alt="Logo Kokoro Médiation Animale"
            width={200}
            height={250}
            contentId="hero-logo"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, "/images/logo-compressé.webp") : noop}
          />
          <EditableText
            initialText="Qu'est-ce que la médiation par l'animal ?"
            contentId="hero-title"
            variant="h2"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Qu'est-ce que la médiation par l'animal ?") : noop}
          />
          <EditableText
            initialText="La médiation par l'animal est la mise en relation d'un bénéficiaire et d'un animal spécifiquement éduqué dans le but de créer des interactions positives visant le bien-être, le maintien ou l'acquisition de compétences physiques, psychiques et/ou sociales des personnes. L'animal, naturel et non jugeant favorise la création d'un lien permettant d'initier le dialogue et les interactions positives."
            contentId="hero-description"
            className="mb-5"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "La médiation par l'animal est la mise en relation d'un bénéficiaire et d'un animal spécifiquement éduqué dans le but de créer des interactions positives visant le bien-être, le maintien ou l'acquisition de compétences physiques, psychiques et/ou sociales des personnes. L'animal, naturel et non jugeant favorise la création d'un lien permettant d'initier le dialogue et les interactions positives.") : noop}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <EditableText
            initialText="La médiation par l'animal s'articule autour d'une relation triadique entre le bénéficiaire de la séance, l'animal et le binôme Intervenant en Médiation Animale et Référent."
            contentId="hero-triadique-description"
            variant="p"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "La médiation par l'animal s'articule autour d'une relation triadique entre le bénéficiaire de la séance, l'animal et le binôme Intervenant en Médiation Animale et Référent.") : noop}
          />
          <div className="mb-9 mt-10 flex w-full items-center justify-center">
            <ul className="space-y-4 pl-5">
              <li>
                <EditableText
                  initialText="- L'animal médiateur :"
                  contentId="hero-animal-mediateur-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "- L'animal médiateur :") : noop}
                />
                <br />
                <EditableText
                  initialText="Animal formé spécifiquement à la médiation par l'animal"
                  contentId="hero-animal-mediateur-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Animal formé spécifiquement à la médiation par l'animal") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText="- Le bénéficiaire :"
                  contentId="hero-beneficiaire-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "- Le bénéficiaire :") : noop}
                />
                <br />
                <EditableText
                  initialText="Personne pour qui la séance est proposée"
                  contentId="hero-beneficiaire-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Personne pour qui la séance est proposée") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText="- L'IMA :"
                  contentId="hero-ima-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "- L'IMA :") : noop}
                />
                <br />
                <EditableText
                  initialText="Intervenant en médiation par l'animal formé"
                  contentId="hero-ima-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Intervenant en médiation par l'animal formé") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText="- Le référent :"
                  contentId="hero-referent-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "- Le référent :") : noop}
                />
                <br />
                <EditableText
                  initialText="Personne qui connait le bénéficiaire et ses difficultés"
                  contentId="hero-referent-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Personne qui connait le bénéficiaire et ses difficultés") : noop}
                />
              </li>
            </ul>
            <EditableImage
              src="/images/triangle_MA.webp"
              alt="Triangle de médiation animale"
              width={300}
              height={300}
              contentId="hero-triangle"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, "/images/triangle_MA.webp") : noop}
            />
          </div>
        </div>
      </div>
      <AccordionList />
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={drawerType === "image" ? (drawerContent as string) : drawerContent}
        onSave={handleSave}
        type={drawerType}
      />
    </main>
  );
};