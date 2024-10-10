"use client";

import Icons from "@/features/commmon/Icons";
import { EditableText } from "@/features/editable/EditableText";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { EditableImage } from "@/features/editable/EditableImage";
import { useSession } from "next-auth/react";
import { useEditableContentManager } from "@/hooks/useEditableContentManager";

type ProcessProps = {
  icon: string;
  text: string;
  contentId: string;
};

const objectifList: ProcessProps[] = [
  {
    icon: "1-iconKokoro",
    text: "Bien-être, apaisement, réduction de l'anxiété, du stress, des angoisses, prendre soin, estime de soi et confiance en soi, concentration, mémoire, autonomie, motricité, rompre l'isolement, interactions sociales, stimulation sensorielle … et bien d'autres.",
    contentId: "objectif-1",
  },
  {
    icon: "2-iconKokoro",
    text: "Les animaux aident à réduire le stress, à apaiser les tensions et à améliorer la gestion des émotions au quotidien. Par le biais d'activités de soins ou d'interaction avec les animaux, les bénéficiaires gagnent en assurance et apprennent à prendre des initiatives.",
    contentId: "objectif-2",
  },
  {
    icon: "3-iconKokoro",
    text: "En groupe, les séances favorisent la coopération, l'écoute, et la gestion des conflits à travers des activités communes.",
    contentId: "objectif-3",
  },
];

export function ProcessSection() {
  const { data: session } = useSession();
  const isEditable = !!session;

  const contentIds = [
    "process-image",
    "process-title",
    "process-description",
    ...objectifList.map(item => item.contentId),
    "process-for-who-title",
    "process-for-who-description",
    "process-team-title",
    "process-team-description"
  ];

  const {
    isDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
    getContent,
    currentContentId,
    handleCancel,
  } = useEditableContentManager(contentIds);

  const noop = () => {};

  return (
    <main className="relative m-auto flex w-full max-w-7xl flex-col gap-8 px-8">
      <div className="sm:gap-13 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-3">
        <div className="relative lg:order-1 lg:col-span-4">
          <div className="mx-auto flex aspect-square w-full max-w-[150px] items-center justify-center rounded-lg bg-gray-100 p-2 sm:max-w-[200px] sm:p-3 md:max-w-[250px] md:p-4 lg:max-w-[300px]">
            <EditableImage
              src={getContent("process-image") || "/images/icone_tout_public.webp"}
              alt="Tout public"
              contentId="process-image"
              className="size-full object-contain"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, getContent("process-image") || "/images/icone_tout_public.webp") : noop}
            />
          </div>
        </div>
        <div className="lg:order-2 lg:col-span-7 xl:col-span-7 xl:col-start-6">
          <EditableText
            initialText={getContent("process-title") || "Les objectifs"}
            contentId="process-title"
            variant="h2"
            className="md:text-3l text-2xl sm:text-2xl lg:text-3xl"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("process-title") || "Les objectifs") : noop}
          />
          <EditableText
            initialText={getContent("process-description") || "Les objectifs sont adaptés à chaque personne en fonction de ses besoins et de ses capacités. Les différentes activités proposées permettront de travailler tout autant le physique que le psychique comme par exemple la motricité, la coordination, mais en même temps l'attention, l'apaisement."}
            contentId="process-description"
            variant="p"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("process-description") || "Les objectifs sont adaptés à chaque personne en fonction de ses besoins et de ses capacités. Les différentes activités proposées permettront de travailler tout autant le physique que le psychique comme par exemple la motricité, la coordination, mais en même temps l'attention, l'apaisement.") : noop}
          />
          {objectifList.map((item) => (
            <div
              key={item.icon}
              className="mb-6 mt-8 flex items-start rounded-lg bg-gray-50 p-4"
            >
              <div className="mr-4 shrink-0">
                <Icons name={item.icon} className="size-8 text-primary" />
              </div>
              <EditableText
                initialText={getContent(item.contentId) || item.text}
                contentId={item.contentId}
                variant="p"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.text) : noop}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="md:mt-0">
          <EditableText
            initialText={getContent("process-for-who-title") || "Pour qui ?"}
            contentId="process-for-who-title"
            variant="h2"
            className="md:text-3l text-2xl sm:text-2xl lg:text-3xl"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("process-for-who-title") || "Pour qui ?") : noop}
          />
          <EditableText
            initialText={getContent("process-for-who-description") || "Tout public ! J'interviens chez des particuliers ou en établissements auprès d'enfants, adolescents, adultes, séniors, personnes en situation de handicap, en soins palliatifs…"}
            contentId="process-for-who-description"
            variant="p"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("process-for-who-description") || "Tout public ! J'interviens chez des particuliers ou en établissements auprès d'enfants, adolescents, adultes, séniors, personnes en situation de handicap, en soins palliatifs…") : noop}
          />
        </div>
        <div className="md:mt-32">
          <EditableText
            initialText={getContent("process-team-title") || "L'équipe de médiation"}
            contentId="process-team-title"
            variant="h2"
            className="md:text-3l text-2xl sm:text-2xl lg:text-3xl"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent("process-team-title") || "L'équipe de médiation") : noop}
          />
          <EditableText
            initialText={getContent("process-team-description") || "Le choix de l'animal est effectué en fonction des objectifs recherchés pour la séance. Ce choix s'effectue avec le bénéficiaire et le référent."}
            contentId="process-team-description"
            variant="p"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Le choix de l'animal est effectué en fonction des objectifs recherchés pour la séance. Ce choix s'effectue avec le bénficiaire et le référent.") : noop}
          />
        </div>
      </div>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={handleCancel}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
        contentId={currentContentId}
      />
    </main>
  );
}
