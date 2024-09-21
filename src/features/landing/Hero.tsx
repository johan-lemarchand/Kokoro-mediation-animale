"use client";

import { EditableText } from "@/features/editable/EditableText";
import { EditableImage } from "@/features/editable/EditableImage";
import AccordionList from "@/features/commmon/AccordionList";

export const Hero = () => {
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
          />
          <EditableText
            initialText="Qu'est-ce que la médiation par l'animal ?"
            contentId="hero-title"
            variant="h2"
          />
          <EditableText
            initialText="La médiation par l'animal est la mise en relation d'un bénéficiaire et d'un animal spécifiquement éduqué dans le but de créer des interactions positives visant le bien-être, le maintien ou l'acquisition de compétences physiques, psychiques et/ou sociales des personnes. L'animal, naturel et non jugeant favorise la création d'un lien permettant d'initier le dialogue et les interactions positives."
            contentId="hero-description"
            className="mb-5"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <EditableText
            initialText="La médiation par l'animal s'articule autour d'une relation triadique entre le bénéficiaire de la séance, l'animal et le binôme Intervenant en Médiation Animale et Référent."
            contentId="hero-triadique-description"
            variant="p"
          />
          <div className="mb-9 mt-10 flex w-full items-center justify-center">
            <ul className="space-y-4 pl-5">
              <li>
                <EditableText
                  initialText="- L'animal médiateur :"
                  contentId="hero-animal-mediateur-title"
                  variant="smallPrimary"
                />
                <br />
                <EditableText
                  initialText="Animal formé spécifiquement à la médiation par l'animal"
                  contentId="hero-animal-mediateur-description"
                  variant="small"
                />
              </li>
              <li>
                <EditableText
                  initialText="- Le bénéficiaire :"
                  contentId="hero-beneficiaire-title"
                  variant="smallPrimary"
                />
                <br />
                <EditableText
                  initialText="Personne pour qui la séance est proposée"
                  contentId="hero-beneficiaire-description"
                  variant="small"
                />
              </li>
              <li>
                <EditableText
                  initialText="- L'IMA :"
                  contentId="hero-ima-title"
                  variant="smallPrimary"
                />
                <br />
                <EditableText
                  initialText="Intervenant en médiation par l'animal formé"
                  contentId="hero-ima-description"
                  variant="small"
                />
              </li>
              <li>
                <EditableText
                  initialText="- Le référent :"
                  contentId="hero-referent-title"
                  variant="smallPrimary"
                />
                <br />
                <EditableText
                  initialText="Personne qui connait le bénéficiaire et ses difficultés"
                  contentId="hero-referent-description"
                  variant="small"
                />
              </li>
            </ul>
            <EditableImage
              src="/images/triangle_MA.webp"
              alt="Triangle de médiation animale"
              width={300}
              height={300}
              contentId="hero-triangle"
            />
          </div>
        </div>
      </div>
      <AccordionList />
    </main>
  );
};
