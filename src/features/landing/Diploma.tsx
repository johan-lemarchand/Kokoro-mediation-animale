"use client";

import { ReactNode, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "./SectionLayout";
import { PiCertificateBold } from "react-icons/pi";
import { EditableText } from "@/features/editable/EditableText";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { useEditableContent } from "@/contexts/EditableContentContext";
import { useSession } from "next-auth/react";

export const DiplomaSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<string | ReactNode>("");
  const [drawerType, setDrawerType] = useState<"text" | "image">("text");
  const [currentContentId, setCurrentContentId] = useState("");
  const { setContent } = useEditableContent();
  const { data: session } = useSession();

  const isEditable = !!session;

  const handleOpenDrawer = async (type: "text", contentId: string, initialContent: string) => {
    try {
      const response = await fetch(`/api/get-content?id=${contentId}`);
      if (response.ok) {
        const data = await response.json();
        setDrawerContent(data.content);
      } else if (response.status === 404) {
        // Content ID does not exist, initialize it with the initial content
        await fetch('/api/create-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: contentId, content: initialContent, type }),
        });
        setDrawerContent(initialContent);
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

  // Fonction vide pour désactiver l'édition
  const noop = () => {};

  return (
    <SectionLayout
      variant="card"
      size="base"
      className="relative flex flex-col items-center justify-center gap-8 overflow-hidden py-16"
      backgroundImage="/images/IMG_3695.webp"
    >
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        <Typography
          variant="h2"
          className="relative z-10 my-6 text-center text-4xl font-bold text-white drop-shadow-sm"
        >
          <EditableText
            initialText="Qui suis-je ?"
            contentId="diploma-title"
            variant="h2"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Qui suis-je ?") : noop}
          />
        </Typography>
        <div className="relative z-10 m-8 text-center text-lg text-white drop-shadow-sm">
          <EditableText
            initialText="Louise, éducatrice de jeunes enfants et médiatrice animale passionnée ! 🌟 Depuis toujours, les animaux occupent une place spéciale dans ma vie, ayant grandi entourée de leur bienveillance. C'est cette connexion unique entre l'homme et l'animal, et les incroyables bienfaits qu'elle apporte, qui m'ont inspiré à exercer en tant qu'intervenante en médiation par l'animal. Après plusieurs années d'expérience dans la relation d'aide, inclure l'animal a été pour moi une évidence!"
            contentId="diploma-description"
            variant="p"
            renderHTML={true}
            className="relative z-10 m-8 text-center text-lg text-white drop-shadow-sm"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Louise, éducatrice de jeunes enfants et médiatrice animale passionnée ! 🌟 Depuis toujours, les animaux occupent une place spéciale dans ma vie, ayant grandi entourée de leur bienveillance. C'est cette connexion unique entre l'homme et l'animal, et les incroyables bienfaits qu'elle apporte, qui m'ont inspiré à exercer en tant qu'intervenante en médiation par l'animal. Après plusieurs années d'expérience dans la relation d'aide, inclure l'animal a été pour moi une évidence!") : noop}
          />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Typography
          variant="h2"
          className="mb-8 text-center text-3xl font-bold"
        >
          <EditableText
            initialText="Mes diplômes"
            contentId="diploma-subtitle"
            variant="h2"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Mes diplômes") : noop}
          />
        </Typography>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {diplomaList.map((item) => (
            <div
              key={item.no}
              className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="shrink-0">
                <span className="flex size-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <PiCertificateBold className="text-xl" />
                </span>
              </div>
              <div className="grow">
                <EditableText
                  initialText={item.text}
                  contentId={`diploma-item-${item.no}`}
                  variant="p"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.text) : noop}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
      />
    </SectionLayout>
  );
};

const diplomaList = [
  {
    no: "1",
    text: "Educatrice de Jeunes Enfants",
  },
  {
    no: "2",
    text: "ACACED (Attestation de Connaissances pour les Animaux de Compagnie d'Espèces Domestiques)",
  },
  {
    no: "3",
    text: "Formation Chargé de Projet en Médiation par l'Animal – Institut de formation AGATEA",
  },
  {
    no: "4",
    text: "PECCRAM (Programme d'Education à la Connaissance du Chien et au Risque d'Accident par Morsure)",
  },
];