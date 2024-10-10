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
    "hero-description-1",
    "hero-description-2",
    "hero-description-3",
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
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
    getContent,
    handleCancel,
    currentContentId,
  } = useEditableContentManager(contentIds);

  const noop = () => {};

  return (
    <main className="relative m-auto my-12 mt-24 flex w-full max-w-7xl flex-col gap-8 px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-6 xl:gap-8">
          <EditableImage
            src={getContent("hero-logo") || "/images/logo-compressé.webp"}
            alt="Logo Kokoro Médiation Animale"
            contentId="hero-logo"
            priority={true}
            className="hidden h-[250px] w-[200px] object-contain lg:block"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, getContent("hero-logo") || "/images/logo-compressé.webp") : noop}
          />
          <EditableText
            initialText={getContent("hero-title") || "Qu'est-ce que la médiation par l'animal ?"}
            contentId="hero-title"
            variant="h2"
            className="md:text-3l text-2xl sm:text-2xl lg:text-3xl"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-title") || "Qu'est-ce que la médiation par l'animal ?") : noop}
          />
          <div className="space-y-2">
            <EditableText
              initialText={getContent("hero-description-1") || "La médiation par l'animal est la mise en relation d'un bénéficiaire et d'un animal spécifiquement éduqué dans le but de créer des interactions positives."}
              contentId="hero-description-1"
              className="mb-2"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-description-1") || "La médiation par l'animal est la mise en relation d'un bénéficiaire et d'un animal spécifiquement éduqué dans le but de créer des interactions positives.") : noop}
            />
            <EditableText
              initialText={getContent("hero-description-2") || "Ces interactions visent le bien-être, le maintien ou l'acquisition de compétences physiques, psychiques et/ou sociales des personnes."}
              contentId="hero-description-2"
              className="mb-2"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-description-2") || "Ces interactions visent le bien-être, le maintien ou l'acquisition de compétences physiques, psychiques et/ou sociales des personnes.") : noop}
            />
            <EditableText
              initialText={getContent("hero-description-3") || "L'animal, naturel et non jugeant, favorise la création d'un lien permettant d'initier le dialogue et les interactions positives."}
              contentId="hero-description-3"
              className="mb-2"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-description-3") || "L'animal, naturel et non jugeant, favorise la création d'un lien permettant d'initier le dialogue et les interactions positives.") : noop}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <EditableText
            initialText={getContent("hero-triadique-description") || "La médiation par l'animal s'articule autour d'une relation triadique entre le bénéficiaire de la séance, l'animal et le binôme Intervenant en Médiation Animale et Référent."}
            contentId="hero-triadique-description"
            variant="p"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-triadique-description") || "La médiation par l'animal s'articule autour d'une relation triadique entre le bénéficiaire de la séance, l'animal et le binôme Intervenant en Médiation Animale et Référent.") : noop}
          />
          <div className="mt-4 flex w-full flex-col items-center justify-center md:flex-row">
          <EditableImage
              src={getContent("hero-triangle") || "/images/triangle_MA.webp"}
              alt="Triangle de médiation animale"
              contentId="hero-triangle"
              priority={true}
              className="mb-4 h-[105px] w-[150px] object-contain md:h-[140px] md:w-[200px] lg:h-[180px] lg:w-[250px]"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, getContent("hero-triangle") || "/images/triangle_MA.webp") : noop}
            />
            <ul className="mb-6 space-y-4 pl-5 md:mb-0 md:w-1/2">
              <li>
                <EditableText
                  initialText={getContent("hero-animal-mediateur-title") || "- L'animal médiateur :"}
                  contentId="hero-animal-mediateur-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-animal-mediateur-title") || "- L'animal médiateur :") : noop}
                />
                <br />
                <EditableText
                  initialText={getContent("hero-animal-mediateur-description") || "Animal formé spécifiquement à la médiation par l'animal"}
                  contentId="hero-animal-mediateur-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-animal-mediateur-description") || "Animal formé spécifiquement à la médiation par l'animal") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText={getContent("hero-beneficiaire-title") || "- Le bénéficiaire :"}
                  contentId="hero-beneficiaire-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-beneficiaire-title") || "- Le bénéficiaire :") : noop}
                />
                <br />
                <EditableText
                  initialText={getContent("hero-beneficiaire-description") || "Personne pour qui la séance est proposée"}
                  contentId="hero-beneficiaire-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-beneficiaire-description") || "Personne pour qui la séance est proposée") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText={getContent("hero-ima-title") || "- L'IMA :"}
                  contentId="hero-ima-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-ima-title") || "- L'IMA :") : noop}
                />
                <br />
                <EditableText
                  initialText={getContent("hero-ima-description") || "Intervenant en médiation par l'animal formé"}
                  contentId="hero-ima-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-ima-description") || "Intervenant en médiation par l'animal formé") : noop}
                />
              </li>
              <li>
                <EditableText
                  initialText={getContent("hero-referent-title") || "- Le référent :"}
                  contentId="hero-referent-title"
                  variant="smallPrimary"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-referent-title") || "- Le référent :") : noop}
                />
                <br />
                <EditableText
                  initialText={getContent("hero-referent-description") || "Personne qui connait le bénéficiaire et ses difficultés"}
                  contentId="hero-referent-description"
                  variant="small"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("hero-referent-description") || "Personne qui connait le bénéficiaire et ses difficultés") : noop}
                />
              </li>
            </ul>
          
          </div>
        </div>
      </div>
      <AccordionList />
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={handleCancel}
        content={drawerType === "image" ? (drawerContent as string) : drawerContent}
        onSave={handleSave}
        type={drawerType}
        contentId={currentContentId}
      />
    </main>
  );
};