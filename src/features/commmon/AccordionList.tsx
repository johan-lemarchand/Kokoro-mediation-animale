"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditableText } from "@/features/editable/EditableText";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { useEditableContent } from "@/contexts/EditableContentContext";

const accordions = [
  {
    no: "One",
    expand: true,
    headingId: "accordion-heading-1",
    bodyId: "accordion-body-1",
    heading: "Favoriser la détente et l'apaisement",
    body: "A travers la présence apaisante des animaux, qui favorisent un environnement relaxant, permettant aux participants de se détendre et de se recentrer, de réduire le stress et l'anxiété.",
  },
  {
    no: "Two",
    expand: false,
    headingId: "accordion-heading-2",
    bodyId: "accordion-body-2",
    heading: "Encourager l'interaction entre les membres du groupe",
    body: "Améliorer la communication et l'écoute mutuelle, les bénéficiaires gagnent en assurance en interagissant avec les animaux et les autres bénéficiaires. Cela encourage également la complicité et les moments de partage en construisant des relations positives.",
  },
  {
    no: "Three",
    expand: false,
    headingId: "accordion-heading-3",
    bodyId: "accordion-body-3",
    heading: "Développer la confiance en soi",
    body: "Renforcer l'estime de soi en prenant soin de l'animal et en se responsabilisant envers lui. Renforcer sa sécurité affective grâce au soutien émotionnel de l'animal.",
  },
  {
    no: "Four",
    expand: false,
    headingId: "accordion-heading-4",
    bodyId: "accordion-body-4",
    heading: "Sensibilisation au respect des animaux",
    body: "Développement de l'empathie grâce à l'interaction directe avec les animaux et l'apprentissage des règles ainsi que la compréhension de l'animal (mode de vie, émotions ressenties, alimentation…). Les bénéficiaires apprennent à reconnaître et à respecter les besoins et émotions des autres, humains comme animaux.",
  },
  {
    no: "Five",
    expand: false,
    headingId: "accordion-heading-5",
    bodyId: "accordion-body-5",
    heading: "Développement des apprentissages de tous types",
    body: "Hygiène, alimentation, rythme, règles… Les animaux nous ressemblent sur beaucoup de points et nous pouvons faire le lien en séance avec ces notions afin de les travailler de manière ludique.",
  },
  {
    no: "Six",
    expand: false,
    headingId: "accordion-heading-6",
    bodyId: "accordion-body-6",
    heading: "Travailler sa motricité",
    body: "Avec le chien, il est possible de faire des parcours, des promenades, lancer des jouets, remplir des jeux et avec les cochons d'inde découper des légumes, afin de maintenir ou développer des acquis.",
  },
  {
    no: "Seven",
    expand: false,
    headingId: "accordion-heading-7",
    bodyId: "accordion-body-7",
    heading: "Joie et amusement",
    body: "Les séances créent des souvenirs positifs, marqués par des moments de rire, de jeu, de souvenirs et de complicité entre les bénéficiaires et les animaux.",
  },
];

export default function AccordionList() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerType, setDrawerType] = useState<"text" | "image">("text");
  const [currentContentId, setCurrentContentId] = useState("");
  const { setContent } = useEditableContent();

  const handleOpenDrawer = async (type: "text" | "image", contentId: string, initialText: string) => {
    try {
      const response = await fetch(`/api/get-content?id=${contentId}`);
      if (response.ok) {
        const data = await response.json();
        setDrawerContent(data.content);
      } else if (response.status === 404) {
        // Content ID does not exist, initialize it with the initial text
        await fetch('/api/create-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: contentId, content: initialText, type }),
        });
        setDrawerContent(initialText);
      } else {
        throw new Error('Erreur lors de la récupération du contenu');
      }
      setDrawerType(type);
      setCurrentContentId(contentId);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
    }
  };

  const handleSave = async (newContent: string) => {
    const response = await fetch('/api/update-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: drawerType, content: newContent, id: currentContentId }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    setContent(currentContentId, newContent);
  };

  return (
    <div className="relative pt-1">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
        {accordions.map((item, index) => (
          <div
            className={`${index % 2 === 0 ? "md:pr-4" : "md:pl-4"}`}
            key={item.no}
          >
            <div className="accordion-wrapper">
              <Accordion type="single" collapsible>
                <AccordionItem value={item.no}>
                  <AccordionTrigger>
                    <EditableText
                      initialText={item.heading}
                      contentId={item.headingId}
                      variant="p"
                      onEdit={(contentId) => handleOpenDrawer("text", contentId, item.heading)}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <EditableText
                      initialText={item.body}
                      contentId={item.bodyId}
                      variant="p"
                      onEdit={(contentId) => handleOpenDrawer("text", contentId, item.body)}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
      />
    </div>
  );
}
