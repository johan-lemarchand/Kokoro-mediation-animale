"use client";

import Icons from "@/features/commmon/Icons";
import { Typography } from "@/components/ui/typography";

type ProcessProps = {
  icon: string;
  text: string;
};

const objectifList: ProcessProps[] = [
  {
    icon: "1-iconKokoro",
    text: "Bien-être, apaisement, réduction de l’anxiété, du stress, des angoisses, prendre soin, estime de soi et confiance en soi, concentration, mémoire, autonomie, motricité, rompre l’isolement, interactions sociales, stimulation sensorielle … et bien d’autres.",
  },
  {
    icon: "2-iconKokoro",
    text: "Les animaux aident à réduire le stress, à apaiser les tensions et à améliorer la gestion des émotions au quotidien. Par le biais d'activités de soins ou d'interaction avec les animaux, les bénéficiaires gagnent en assurance et apprennent à prendre des initiatives.",
  },
  {
    icon: "3-iconKokoro",
    text: "En groupe, les séances favorisent la coopération, l'écoute, et la gestion des conflits à travers des activités communes.",
  },
];

export function ProcessSection() {
  return (
    <main className="relative m-auto flex w-full max-w-7xl flex-col gap-8 px-8">
      <div className="sm:gap-13 mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-3">
        <div className="relative lg:order-1 lg:col-span-4">
          <div className="mx-auto flex aspect-square w-full max-w-[350px] items-center justify-center rounded-lg bg-gray-100 p-4">
            <figure className="relative m-0 size-full">
              <img
                src="/images/icone_tout_public.webp"
                alt="Tout public"
                className="size-full object-contain"
              />
            </figure>
          </div>
        </div>
        <div className="lg:order-2 lg:col-span-7 xl:col-span-7 xl:col-start-6">
          <h2 className="mb-3 text-3xl font-bold text-primary">
            Les objectifs
          </h2>
          <Typography variant="p" className="mt-4 text-lg">
            Les objectifs sont adaptés à chaque personne en fonction de ses
            besoins et de ses capacités. Les différentes activités proposées
            permettront de travailler tout autant le physique que le psychique
            comme par exemple la motricité, la coordination, mais en même temps
            l'attention, l'apaisement.
          </Typography>
          {objectifList.map((item) => (
            <div 
              key={item.icon} 
              className="mb-6 mt-8 flex items-start rounded-lg bg-gray-50 p-4"
            >
              <div className="mr-4 shrink-0">
                <Icons name={item.icon} className="size-8 text-primary" />
              </div>
              <Typography variant="p" className="text-sm">
                {item.text}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="md:mt-0">
          <Typography variant="h2" className="mb-4 max-w-xl !leading-tight">
            Pour qui ?
          </Typography>
          <Typography variant="p" className="text-lg">
            Tout public ! J'interviens chez des particuliers ou en
            établissements auprès d'enfants, adolescents, adultes, séniors,
            personnes en situation de handicap, en soins palliatifs…
          </Typography>
        </div>
        <div className="md:mt-32">
          <Typography variant="h2" className="mb-4 max-w-xl !leading-tight">
            L'équipe de médiation
          </Typography>
          <Typography variant="p" className="text-lg">
            Le choix de l'animal est effectué en fonction des objectifs
            recherchés pour la séance. Ce choix s'effectue avec le
            bénéficiaire et le référent.
          </Typography>
        </div>
      </div>
    </main>
  );
}
