import { cn } from "@/lib/utils";
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
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl shadow-md hover:shadow-xl transition duration-200 relative",
        className
      )}
    >
      <div className="overflow-hidden">
        {image && (
          <div className="relative h-48 w-full">
            {image}
          </div>
        )}
        <div className="p-4">
          <div className="mb-2 text-lg font-bold">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};
