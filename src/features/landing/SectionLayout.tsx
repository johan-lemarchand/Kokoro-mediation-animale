import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

type SectionLayoutProps = ComponentPropsWithoutRef<"div"> & {
  size?: "sm" | "base" | "lg";
  variant?: "default" | "card" | "primary" | "invert" | "image";
  containerClassName?: string;
  backgroundImage?: string;
};

export const SectionLayout = ({
  size = "base",
  variant = "default",
  className,
  containerClassName,
  children,
  backgroundImage,
  ...props
}: SectionLayoutProps) => {
  return (
    <div
      className={cn(
        "relative",
        {
          "bg-background text-foreground": variant === "default",
          "bg-card text-card-foreground": variant === "card",
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-foreground text-background": variant === "invert",
          "text-foreground": variant === "image",
        },
        containerClassName,
      )}
      {...props}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={100}
          />
          {variant === "image" && (
            <div className="absolute inset-0 backdrop-blur-sm backdrop-brightness-75" />
          )}
        </div>
      )}
      <div
        className={cn(
          "relative z-10 m-auto px-4 py-10 lg:py-24",
          {
            "max-w-4xl": size === "sm",
            "max-w-5xl": size === "base",
            "max-w-6xl": size === "lg",
          },
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
