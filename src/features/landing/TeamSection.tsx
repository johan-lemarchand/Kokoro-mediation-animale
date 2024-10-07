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
    setIsDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
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
                initialText={item.name}
                contentId={item.nameId}
                variant="h3"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.name) : noop}
              />
            }
            description={
              <EditableText
                initialText={item.description}
                contentId={item.descriptionId}
                variant="p"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.description) : noop}
              />
            }
            image={
              <EditableImage
                src={item.image}
                alt={item.name}
                contentId={item.imageId}
                className="size-full"
                objectFit="cover"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, item.image) : noop}
              />
            }
          />
        ))}
      </BentoGrid>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
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
    id: 5,
    nameId: "team-name-5",
    imageId: "team-image-5",
    descriptionId: "team-description-5",
    name: "Roukia",
    image: "/images/IMG_3577.webp",
    description: "Adore les gratouilles sous le cou, c'est son endroit favori.",
  },
];
