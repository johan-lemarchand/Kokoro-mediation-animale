"use client";

import { SiteConfig } from "@/site-config";
import Typewriter from "typewriter-effect";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SocialLinks from "@/features/social/SocialLinks";
import { Mails, Images, Home } from "lucide-react";
import { useSession } from "next-auth/react";
import { EditableImage } from "@/features/editable/EditableImage";

function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1],
  );

  useEffect(() => {
    const onChange = (current: number) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    };

    const deleteEvent = scrollY.on("change", onChange);

    const listener = () => {
      const currentScroll = window.scrollY;
      onChange(currentScroll);
    };

    window.addEventListener("scroll", listener);

    return () => {
      deleteEvent();
      window.removeEventListener("scroll", listener);
    };
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export function LandingHeader({ isGalleryPage = false }) {
  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );
  const { data: session } = useSession();
  const isEditable = true;
  const handleOpenDrawer = (type: string, contentId: string, src: string) => {
  };
  const noop = () => {};

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressDelayed, [0, 1], [110, 80]),
        zIndex: session ? 0 : 30,
      }}
      className="fixed inset-x-0 flex h-20 w-screen bg-gradient-to-r from-white via-green-50 to-white"
    >
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <EditableImage
              src="/images/logo-compressé.webp"
              alt="Logo Kokoro Médiation Animale"
              contentId="header-logo"
              priority={true}
              className="size-16 object-contain md:size-20"
              onEdit={isEditable ? (contentId) => handleOpenDrawer("image", contentId, "/images/logo-compressé.webp") : noop}
            />
          </div>
          <div className="flex flex-col">
            <motion.p
              style={{
                scale: useTransform(
                  scrollYBoundedProgressDelayed,
                  [0, 1],
                  [1, 0.9],
                ),
              }}
              className="custom-font-text flex origin-left items-center text-xl font-semibold uppercase max-sm:hidden"
            >
              {SiteConfig.title}
            </motion.p>
            <span className="font-custom ml-2 hidden text-nowrap text-xl text-primary sm:block">
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: ["Médiation animale"],
                }}
              />
            </span>
          </div>
        </div>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0],
            ),
          }}
          className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
        >
          {session?.user?.name && (
            <span className="mr-4">Bonjour {session.user.name}</span>
          )}
          {!isGalleryPage ? (
            <Link
              href="/galerie"
              className={buttonVariants({
                variant: "link",
                className: "mt-2",
              })}
            >
              <Images size={20} className="mr-2" />
              Galerie d'images
            </Link>
          ) : (
            <Link
              href="/"
              className={buttonVariants({
                variant: "link",
                className: "mt-2",
              })}
            >
              <Home size={20} className="mr-2" />
              Accueil
            </Link>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className={buttonVariants({
                className: "mt-2",
              })}
            >
              <Mails size={20} className="mr-2" />
              Contact
            </Link>
            <div className="mt-2 sm:ml-4 sm:mt-0">
              <SocialLinks />
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);