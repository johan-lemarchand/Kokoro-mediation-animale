"use client";

import { Typography } from "@/components/ui/typography";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  type: 'address' | 'phone' | 'email';
}

export function ContactSection() {
  return (
    <main className="relative m-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-12">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-3">
        <div className="relative lg:col-span-5">
          <div className="mx-auto flex aspect-square w-full max-w-[350px] items-center justify-center rounded-lg bg-gray-100 p-4">
            <figure className="relative m-0 size-full">
              <img
                src="/images/carte-bas-rhin-departement-618x601.webp"
                alt="Carte bas Rhin"
                className="size-full object-contain"
              />
            </figure>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="mb-3 text-3xl font-bold text-primary">
            Lieu d'intervention
          </h2>
          <Typography variant="p" className="mt-4 text-lg">
            J'interviens en itinérance dans le Bas-Rhin.
            <br />
            Pour plus de renseignements ou un devis, n'hésitez pas à me
            contacter par téléphone ou par mail. <br />
            <br /> <span className="font-bold">Louise BURG</span>
          </Typography>
          <h2 className="mb-3 mt-6 text-3xl font-bold text-primary">
            Mes informations
          </h2>
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
    </main>
  );
}

function ContactCard({ icon, title, content, type }: ContactCardProps) {
  const handleClick = () => {
    switch (type) {
      case 'address':
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.open(`https://maps.google.com/?q=${encodeURIComponent(content)}`, '_blank');
        } else {
          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content)}`, '_blank');
        }
        break;
      case 'phone':
        window.location.href = `tel:${content.replace(/\s/g, '')}`;
        break;
      case 'email':
        window.location.href = `mailto:${content}`;
        break;
    }
  };

  return (
    <div 
      className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full"
      onClick={handleClick}
    >
      <div className="mb-2 text-2xl text-primary">{icon}</div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm break-words w-full" style={{ wordBreak: 'break-all' }}>{content}</p>
    </div>
  );
}
