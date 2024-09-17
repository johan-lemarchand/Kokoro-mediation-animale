import { Typography } from "@/components/ui/typography";
import AccordionList from "@/features/commmon/AccordionList";
import Image from "next/image";

export const Hero = () => {
  return (
    <main className="relative m-auto my-12 mt-32 flex w-full max-w-7xl flex-col gap-8 px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-6 xl:gap-8">
          <Image
            src="/images/logo-compressé.webp"
            alt="Logo Kokoro Médiation Animale"
            width={200}
            height={200}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <Typography variant="h2" className="max-w-3xl !leading-tight">
            Qu'est-ce que la médiation par l'animal ?
          </Typography>
          <Typography variant="p" className="max-w-3xl">
            La médiation par l'animal est la mise en relation d'un bénéficiaire
            et d'un animal spécifiquement éduqué dans le but de créer des
            interactions positives visant le bien-être, le maintien ou
            l'acquisition de compétences physiques, psychiques et/ou sociales
            des personnes. L'animal, naturel et non jugeant favorise la création
            d'un lien permettant d'initier le dialogue et les interactions
            positives.
          </Typography>
        </div>
        <div className="flex flex-1 flex-col">
          <Typography variant="p">
            La médiation par l'animal s'articule autour d'une relation
            triadique entre le bénéficiaire de la séance, l'animal et le
            binôme Intervenant en Médiation Animale et Référent.
          </Typography>
          <div className="mb-9 mt-10 flex w-full items-center justify-center">
            <ul className="space-y-4 pl-5">
              <li>
                <span className="font-bold">- L'animal médiateur :</span>{' '}
                <br />
                Animal formé spécifiquement à la médiation par l'animal
              </li>
              <li>
                <span className="font-bold">- Le bénéficiaire :</span> <br />
                Personne pour qui la séance est proposée
              </li>
              <li>
                <span className="font-bold">- L'IMA :</span> <br />
                Intervenant en médiation par l'animal formé
              </li>
              <li>
                <span className="font-bold">- Le référent :</span> <br />
                Personne qui connait le bénéficiaire et ses difficultés
              </li>
            </ul>
            <img
              src="/images/triangle_MA.webp"
              srcSet="/images/triangle_MA.webp"
              alt="about"
              className="h-auto w-1/2 object-contain"
            />
          </div>
        </div>
      </div>
      <AccordionList />
    </main>
  );
};
