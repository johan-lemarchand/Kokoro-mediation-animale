"use client";

import { ReactNode } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { EditableText } from "@/features/editable/EditableText";
import { EditableImage } from "@/features/editable/EditableImage";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { useSession } from "next-auth/react";
import { useEditableContentManager } from "@/hooks/useEditableContentManager";

export function ContactSection() {
  const { data: session } = useSession();
  const isEditable = !!session;

  const contentIds = [
    "contact-map-image",
    "contact-intervention-title",
    "contact-intervention-description",
    "contact-info-title"
  ];

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
  } = useEditableContentManager(contentIds);

  // Fonction vide pour désactiver l'édition
  const noop = () => {};

  return (
    <main className="relative m-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-12">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-3">
        <div className="relative lg:col-span-5">
          <div className="mx-auto flex aspect-square w-full max-w-[350px] items-center justify-center rounded-lg bg-gray-100 p-4">
            <figure className="relative m-0 size-full">
              <EditableImage
                src="/images/carte-bas-rhin-departement-618x601.webp"
                alt="Carte bas Rhin"
                contentId="contact-map-image"
                className="size-full"
                objectFit="contain"
                onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, "/images/carte-bas-rhin-departement-618x601.webp") : noop}
              />
            </figure>
          </div>
        </div>
        <div className="lg:col-span-7">
          <EditableText
            initialText="Lieu d'intervention"
            contentId="contact-intervention-title"
            variant="h2"
            className="mb-3 text-3xl font-bold text-primary"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Lieu d'intervention") : noop}
          />
          <div className="mt-4 text-lg">
            <EditableText
              initialText="J'interviens en itinérance dans le Bas-Rhin.<br />Pour plus de renseignements ou un devis, n'hésitez pas à me contacter par téléphone ou par mail.<br /><br /><span class='font-bold'>Louise BURG</span>"
              contentId="contact-intervention-description"
              variant="p"
              renderHTML={true}
              className="mt-4 text-lg"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "J'interviens en itinérance dans le Bas-Rhin.<br />Pour plus de renseignements ou un devis, n'hésitez pas à me contacter par téléphone ou par mail.<br /><br /><span class='font-bold'>Louise BURG</span>") : noop}
            />
          </div>
          <EditableText
            initialText="Mes informations"
            contentId="contact-info-title"
            variant="h2"
            className="mb-3 mt-6 text-3xl font-bold text-primary"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Mes informations") : noop}
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ContactCard
              icon={<FaMapMarkerAlt />}
              title="Adresse"
              content="26 E rue de Kaltenhouse, 67240 OBERHOFFEN-SUR-MODER"
              type="address"
            />
            <ContactCard
              icon={<FaPhone />}
              title="Téléphone"
              content="06.46.45.39.66"
              type="phone"
            />
            <ContactCard
              icon={<FaEnvelope />}
              title="Email"
              content="kokoro.mediation.animale@gmail.com"
              type="email"
            />
          </div>
        </div>
      </div>
      <EditableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={drawerContent}
        onSave={handleSave}
        type={drawerType}
      />
    </main>
  );
}

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  type: "address" | "phone" | "email";
}

function ContactCard({ icon, title, content, type }: ContactCardProps) {
  const handleClick = () => {
    switch (type) {
      case "address":
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          )
        ) {
          window.open(
            `https://maps.google.com/?q=${encodeURIComponent(content)}`,
            "_blank",
          );
        } else {
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content)}`,
            "_blank",
          );
        }
        break;
      case "phone":
        window.location.href = `tel:${content.replace(/\s/g, "")}`;
        break;
      case "email":
        window.location.href = `mailto:${content}`;
        break;
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-shadow duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="mb-2 text-2xl text-primary">{icon}</div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <div
        className="w-full break-words text-sm"
        style={{ wordBreak: "break-all" }}
      >
        {content}
      </div>
    </div>
  );
}
