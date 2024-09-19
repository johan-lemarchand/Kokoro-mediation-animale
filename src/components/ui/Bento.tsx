import { cn } from "@/lib/utils";
import Image from "next/image";
import { StaticImageData } from "next/image";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
}: {
  className?: string;
  title?: string;
  description?: string;
  image?: string | StaticImageData;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-200",
        className,
      )}
    >
      {image && (
        <div className="relative h-48">
          <Image
            src={image}
            alt={`Photo de ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
