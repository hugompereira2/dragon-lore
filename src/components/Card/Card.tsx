'use client'

import { Dragon } from "@/types/dragon";
import Image from "next/image";
import './style.scss';
import { formatToBrazilianDate } from "@/helpers/helpers";

type CardProps = {
  dragon: Dragon;
};

export default function Card({ dragon }: CardProps) {

  const handleElementalType: Record<string, { title: string; icon: string }> = {
    Fogo: { title: "Fogo", icon: "/assets/elemental/fire.svg" },
    Planta: { title: "Planta", icon: "/assets/elemental/leaf.svg" },
    Água: { title: "Água", icon: "/assets/elemental/water.svg" },
    Terra: { title: "Terra", icon: "/assets/elemental/stone.svg" },
    default: { title: dragon.type, icon: "/assets/elemental/unknown.svg" },
  };

  const elementalData = handleElementalType[dragon.type] || handleElementalType.default;

  return (
    <article className="card">
      <Image className="card-elemental" title={elementalData.title} src={elementalData.icon} alt={`Ícone representando o elemento ${elementalData.title}`} width={40} height={40} />
      <Image className="logo" src={'/assets/dragon.svg'} alt="Ícone Dragão" width={90} height={90} />
      <h2 className="card-title">{dragon.name}</h2>
      <p className="card-description">{elementalData.title}</p>
      <p className="card-description">{formatToBrazilianDate(dragon.createdAt, false)}</p>
    </article>
  );
}
