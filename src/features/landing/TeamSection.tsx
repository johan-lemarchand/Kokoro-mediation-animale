"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/Bento";
import { SectionLayout } from "./SectionLayout";
import { EditableText } from "@/features/editable/EditableText";
import { EditableImage } from "@/features/editable/EditableImage";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { useSession } from "next-auth/react";
import { useEditableContentManager } from "@/hooks/useEditableContentManager";

export function TeamGridSection() {
  const { data: session } = useSession();
  const isEditable = !!session;

  const contentIds = teams.flatMap(item => [item.nameId, item.imageId, item.descriptionId]);

  const {
    isDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
    handleCancel,
    getContent,
    currentContentId,
  } = useEditableContentManager(contentIds);

  const noop = () => {};

  return (
    <SectionLayout>
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {teams.map((item) => (
          <BentoGridItem
            key={item.id}
            title={
              <EditableText
                initialText={getContent(item.nameId) || item.name}
                contentId={item.nameId}
                variant="h3"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent(item.nameId) || item.name) : noop}
              />
            }
            description={
              <EditableText
                initialText={getContent(item.descriptionId) || item.description}
                contentId={item.descriptionId}
                variant="p"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, getContent(item.descriptionId) || item.description) : noop}
              />
            }
            image={
              <EditableImage
                src={getContent(item.imageId) || item.image}
                alt={item.name}
                contentId={item.imageId}
                className="size-full"
                objectFit="cover"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, getContent(item.imageId) || item.image) : noop}
              />
            }
          />
        ))}
      </BentoGrid>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={handleCancel}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
        contentId={currentContentId}
      />
    </SectionLayout>
  );
}

const teams = [
  {
    id: 1,
    nameId: "team-name-1",
    imageId: "team-image-1",
    descriptionId: "team-description-1",
    name: "Renji",
    image: "/images/IMG_3625.webp",
    description:
      "Gourmand, la recherche de friandises est son activité favorite.",
  },
  {
    id: 2,
    nameId: "team-name-2",
    imageId: "team-image-2",
    descriptionId: "team-description-2",
    name: "Tokyo",
    image: "/images/nami.webp",
    description: "Très curieuse et s'amuse à découvrir de nouvelles aventures.",
  },
  {
    id: 3,
    nameId: "team-name-3",
    imageId: "team-image-3",
    descriptionId: "team-description-3",
    name: "Mochi",
    image: "/images/IMG_3442.webp",
    description:
      "La plus câline et apprécie grandement les friandises et être brossée.",
  },
  {
    id: 4,
    nameId: "team-name-4",
    imageId: "team-image-4",
    descriptionId: "team-description-4",
    name: "Nami",
    image: "/images/tokyo.webp",
    description:
      "La plus jeune, est la demi-sœur de Tokyo ! Vous voyez la ressemblance ?",
  },
  {
    id: 6,
    nameId: "team-name-6",
    imageId: "team-image-6",
    descriptionId: "team-description-6",
    name: "Cynder",
    image: "/images/Cynder.jpg",
    description: "Exploratrice et curieuse, elle aime saluer tout le monde.",
  },
  {
    id: 7,
    nameId: "team-name-7",
    imageId: "team-image-7",
    descriptionId: "team-description-7",
    name: "Mayu",
    image: "/images/Mayu.jpg",
    description: "Petit charmeur qui attire l’attention de part sa particularité physique !",
  },
  {
    id: 8,
    nameId: "team-name-8",
    imageId: "team-image-8",
    descriptionId: "team-description-8",
    name: "Sparky",
    image: "/images/Sparky.jpg",
    description: "Facilement en confiance, il a tendance à s’endormir lorsqu’on le gratouille.",
  },
  {
    id: 9,
    nameId: "team-name-9",
    imageId: "team-image-9",
    descriptionId: "team-description-9",
    name: "Spyro",
    image: "/images/Spyro.jpg",
    description: "Douce et affectueuse, elle est parfaite pour des temps d’apaisement.",
  },
  {
    id: 10,
    nameId: "team-name-10",
    imageId: "team-image-10",
    descriptionId: "team-description-10",
    name: "Totoro",
    image: "/images/Totoro.jpg",
    description: "Il aime vadrouiller, explorer ! Mais accorde des petits moments de câlins",
  },
  {
    id: 11,
    nameId: "team-name-11",
    imageId: "team-image-11",
    descriptionId: "team-description-11",
    name: "Yumi",
    image: "/images/Yumi.jpg",
    description: "Elle aime tout autant explorer que les moments de câlins.",
  },
  {
    id: 12,
    nameId: "team-name-12",
    imageId: "team-image-12",
    descriptionId: "team-description-12",
    name: "Yuzu",
    image: "/images/Yuzu.jpg",
    description: "Petite pipelette qui aimera vous raconter ses aventures !",
  },
];
