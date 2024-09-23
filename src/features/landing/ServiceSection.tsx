"use client";

import { useState } from "react";
import { SectionLayout } from "./SectionLayout";
import Icon1 from "@/components/svg/Icon1Kokoro";
import Icon2 from "@/components/svg/Icon2Kokoro";
import Icon3 from "@/components/svg/Icon3Kokoro";
import Icon4 from "@/components/svg/Icon4Kokoro";
import ServiceCard from "@/features/commmon/ServiceCard";
import { EditableText } from "@/features/editable/EditableText";
import { EditableDrawer } from "@/features/editable/EditableDrawer";
import { useEditableContent } from "@/contexts/EditableContentContext";
import { useSession } from "next-auth/react";

export function ServiceSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerType, setDrawerType] = useState<"text" | "image">("text");
  const [currentContentId, setCurrentContentId] = useState("");
  const { setContent } = useEditableContent();
  const { data: session } = useSession();

  const isEditable = !!session;

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

  // Fonction vide pour désactiver l'édition
  const noop = () => {};

  return (
    <SectionLayout className={"py-10 lg:py-10"}>
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <EditableText
            initialText="Mes prestations"
            contentId="service-section-title"
            variant="h2"
            className="mb-4 text-3xl font-bold"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Mes prestations") : noop}
          />
          <EditableText
            initialText="Le service que j'offre est spécialement conçu pour répondre à vos besoins."
            contentId="service-section-subtitle"
            variant="p"
            className="text-lg"
            onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, "Le service que j'offre est spécialement conçu pour répondre à vos besoins.") : noop}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              Icon={item.icon}
              title={
                <EditableText
                  initialText={item.title}
                  contentId={`service-title-${item.id}`}
                  variant="h3"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.title) : noop}
                />
              }
              description={
                <EditableText
                  initialText={item.description}
                  contentId={`service-description-${item.id}`}
                  variant="p"
                  onEdit={isEditable ? (contentId) => handleOpenDrawer("text", contentId, item.description) : noop}
                />
              }
              learnMore={
                <div dangerouslySetInnerHTML={{ __html: item.learnMore }} />
              }
              linkType={item.linkType}
            />
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
}

const services = [
  {
    id: 1,
    link: "#",
    icon: Icon1,
    title: "Séance Découverte",
    linkText: "Learn More",
    linkType: "red",
    learnMore: `1 à 6 participants - 45min/1h<br/>
              Vous êtes curieux de découvrir ce qu'est la médiation par l'animal et les merveilleux bienfaits qu'elle peut offrir ? 
              Je vous invite à participer à une séance découverte, où vous pourrez plonger dans cet univers apaisant et bienveillant,
              au contact de mes animaux.<br/>
              Lors de cette séance, vous aurez l'occasion d'explorer les principes fondamentaux de la médiation par l'animal et 
              d'expérimenter, en douceur, les effets bénéfiques qu'une connexion avec les animaux peut avoir sur le bien-être émotionnel,
              social et physique.`,
    description: `1 à 6 participants - 45min/1h <br/>
      Une séance pour la découverte de la médiation par l'animal.`,
  },
  {
    id: 2,
    link: "#",
    icon: Icon2,
    title: "Séance Programme",
    linkText: "Learn More",
    linkType: "red",
    learnMore: `1 à 4 participants - 45min/1h<br/>
              Vous souhaitez aller au-delà d'une simple découverte et travailler sur des objectifs précis grâce à la médiation par l'animal ? 
              Je vous propose un programme de séances personnalisées, conçu pour répondre à vos besoins spécifiques et définis ensemble.<br/>
              Ce programme s'adresse à tout public, en individuel ou en groupe, qui souhaite bénéficier d'un accompagnement sur mesure, 
              où chaque séance contribue à atteindre des objectifs précis, qu'ils soient d'ordre éducatif, thérapeutique, ou social.<br/><br/>
              <strong>Comment fonctionne le programme ?</strong><br/>
              Nous définissions ensemble des objectifs lors d'un premier rendez-vous en présentiel ou par téléphone.<br/>
              Les séances sont structurées et progressives. Le programme se compose de plusieurs séances régulières, adaptées à votre rythme et à vos capacités. 
              Chaque séance est conçue pour atteindre des étapes concrètes en fonction des objectifs définis.<br/>
              Les activités proposées sont sélectionnées et ajustées en fonction des besoins à travailler et les animaux sont choisis selon ces mêmes critères et selon vos préférences.<br/>
              À chaque étape, nous évaluons ensemble les progrès réalisés. Si nécessaire, le programme peut être ajusté pour s'adapter à l'évolution des besoins et des ressentis.<br/>
              Tout au long du programme, l'accompagnement s'effectuera par des animaux choisis pour leur sensibilité et leur capacité à favoriser les échanges et le bien-être.<br/><br/>
              <strong>Un programme qui s'adapte à vous</strong><br/>
              Que vous soyez particulier, professionnel d'un établissement, parent, éducateur, ou référent d'un groupe, les séances programme sont conçues pour répondre 
              à des besoins variés. Je travaille avec vous pour créer un parcours évolutif, où chaque séance est une étape 
              vers un bien-être amélioré et un épanouissement personnel.`,
    description: `1 à 4 participants - 45min/1h <br/>
      Programme de séances centrées sur des objectifs précis.`,
  },
  {
    id: 3,
    link: "#",
    icon: Icon3,
    linkType: "red",
    title: "Séance Animation",
    linkText: "Learn More",
    learnMore: `1 à 6 participants – 45min/1h<br/>
      Ces séances sont adaptées à tous les âges et peuvent être personnalisées en fonction des besoins et des objectifs du groupe.<br/>
      Que ce soit pour des ateliers éducatifs ou des journées spéciales, ces animations sont l'occasion de découvrir, apprendre et passer un moment apaisant auprès des animaux.<br/>
      Ces séances n'incluent pas d'objectifs précis, seulement de passer un agréable moment en compagnie de mes animaux et de profiter de leurs bénéfices.`,
    description: `1 à 6 participants - 45min/1h <br/>
      Séance de divertissement sans objectifs précis, sauf le bien-être.`,
  },
  {
    id: 4,
    link: "#",
    icon: Icon4,
    linkType: "red",
    title: "Séance Parents-Enfants",
    linkText: "Learn More",
    learnMore: `1 à 4 duo parents-enfants - 45 min/1h<br/>
      À travers la médiation animale et mon expérience d'éducatrice de jeunes enfants, je vous propose une approche unique pour renforcer la relation avec votre enfant.<br/>
      Grâce à la présence bienveillante des animaux, je crée un espace de connexion où parents et enfants peuvent s'exprimer, collaborer et tisser des liens encore plus forts.<br/>
      Ces séances permettent de développer la confiance mutuelle, d'améliorer la communication, tout en apportant une touche de douceur et de plaisir.`,
    description: `1 à 4 duo parents-enfants - 45 min/1h <br/>
      Séance spécialement dédiée au lien parent-enfant.`,
  },
  {
    id: 5,
    link: "#",
    icon: Icon1,
    linkType: "red",
    title: "Séance Interventions PECCRAM",
    linkText: "Learn More",
    learnMore: `Ateliers destinés aux enfants de 4 à 12 ans. <br/>
      Ces ateliers ont pour objectif d'enseigner aux enfants le langage canin et les comportements à adopter avec les chiens. Elles leur apprennent à interagir de manière sécurisée et respectueuse avec les animaux, réduisant ainsi les accidents potentiels. Mais surtout, elles permettent d'harmoniser la relation entre l'Homme et le chien. Ces séances peuvent être effectuées à domicile ou en établissement.`,
    description: `Ateliers destinés aux enfants de 4 à 12 ans.`,
  },
];