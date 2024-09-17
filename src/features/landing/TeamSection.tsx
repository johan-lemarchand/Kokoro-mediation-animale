"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/Bento";
import { SectionLayout } from "./SectionLayout";

export function TeamGridSection() {
  return (
    <SectionLayout>
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {teams.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            image={item.image}

          />
        ))}
      </BentoGrid>
    </SectionLayout>
  );
}

const teams = [
  {
    id: 1,
    name: 'Renji',
    image: '/images/IMG_3625.webp',
    description:
      'Gourmand, la recherche de friandises est son activité favorite.',
  },
  {
    id: 2,
    name: 'Tokyo',
    image: '/images/nami.webp',
    description: 'Très curieuse et s’amuse à découvrir de nouvelles aventures.',
  },
  {
    id: 3,
    name: 'Mochi',
    image: '/images/IMG_3442.webp',
    description:
      'La plus câline et apprécie grandement les friandises et être brossée.',
  },
  {
    id: 4,
    name: 'Nami',
    image: '/images/tokyo.webp',
    description:
      'La plus jeune, est la demi-sœur de Tokyo ! Vous voyez la ressemblance ?',
  },
  {
    id: 5,
    name: 'Roukia',
    image: '/images/IMG_3577.webp',
    description: 'Adore les gratouilles sous le cou, c’est son endroit favori.',
  },
];
