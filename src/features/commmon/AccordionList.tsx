"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordions = [
  {
    no: "One",
    expand: true,
    heading: "Favoriser la détente et l'apaisement",
    body: "A travers la présence apaisante des animaux, qui favorisent un environnement relaxant, permettant aux participants de se détendre et de se recentrer, de réduire le stress et l'anxiété.",
  },
  {
    no: "Two",
    expand: false,
    heading: "Encourager l’interaction entre les <br /> membres du groupe",
    body: "Améliorer la communication et l’écoute mutuelle, les bénéficiaires gagnent en assurance en interagissant avec les animaux et les autres bénéficiaires. Cela encourage également la complicité et les moments de partage en construisant des relations positives.",
  },
  {
    no: "Three",
    expand: false,
    heading: "Développer la confiance en soi",
    body: "Renforcer l’estime de soi en prenant soin de l’animal et en se responsabilisant envers lui. Renforcer sa sécurité affective grâce au soutien émotionnel de l’animal.",
  },
  {
    no: "Four",
    expand: false,
    heading: "Sensibilisation au respect des<br /> animaux",
    body: "Développement de l’empathie grâce à l’interaction directe avec les animaux et l’apprentissage des règles ainsi que la compréhension de l’animal (mode de vie, émotions ressenties, alimentation…). Les bénéficiaires apprennent à reconnaître et à respecter les besoins et émotions des autres, humains comme animaux.",
  },
  {
    no: "Five",
    expand: false,
    heading: "Développement des apprentissages <br />de tous types",
    body: "Hygiène, alimentation, rythme, règles… Les animaux nous ressemblent sur beaucoup de points et nous pouvons faire le lien en séance avec ces notions afin de les travailler de manière ludique.",
  },
  {
    no: "Six",
    expand: false,
    heading: "Travailler sa motricité",
    body: "Avec le chien, il est possible de faire des parcours, des promenades, lancer des jouets, remplir des jeux et avec les cochons d’inde découper des légumes, afin de maintenir ou développer des acquis.",
  },
  {
    no: "Seven",
    expand: false,
    heading: "Joie et amusement",
    body: "Les séances créent des souvenirs positifs, marqués par des moments de rire, de jeu, de souvenirs et de complicité entre les bénéficiaires et les animaux.",
  },
];

export default function AccordionList() {
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
                    <div
                      className="text-left"
                      dangerouslySetInnerHTML={{ __html: item.heading }}
                    />
                  </AccordionTrigger>
                  <AccordionContent>{item.body}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
