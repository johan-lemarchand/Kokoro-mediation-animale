import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import SocialLinks from "@/features/social/SocialLinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card bg-gradient-to-r from-white via-green-100 to-white">
      <Layout className="py-12">
        <LayoutContent className="flex flex-col items-start justify-between lg:flex-row">
          <div className="mb-8 flex flex-col items-start gap-6 lg:mb-0 lg:w-1/2">
            <div className="mb-4 flex items-center gap-4">
              <Image
                src="/images/logo.svg"
                alt="Logo Kokoro Médiation Animale"
                width={100}
                height={100}
                className="size-24"
              />
              <div className="space-y-1">
                <Typography variant="h3">{SiteConfig.title}</Typography>
                <Typography variant="muted">
                  {SiteConfig.company.name}
                </Typography>
                <Typography variant="muted">
                  {SiteConfig.company.address}
                </Typography>
              </div>
            </div>
            <Typography variant="muted" className="italic">
              <a
                href="https://www.anstett-solutions-pro.fr/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Anstett Solutions pro"
                  src="/images/favicon-anstett.ico"
                  srcSet="/images/favicon-anstett.ico"
                />
              </a>
              © {new Date().getFullYear()} {SiteConfig.company.name} - Anstett
              Solutions Pro.
            </Typography>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:w-1/2 lg:flex-row">
            <div className="flex flex-col gap-4">
              <Typography variant="large">En savoir plus</Typography>
              <Dialog>
                <DialogTrigger asChild>
                  <Typography
                    as="button"
                    variant="muted"
                    className="text-left hover:underline"
                  >
                    Conditions d'utilisation
                  </Typography>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Conditions d'utilisation</DialogTitle>
                    <DialogDescription>
                      Veuillez lire attentivement nos conditions d'utilisation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 max-h-[60vh] overflow-y-auto">
                    <Typography>
                      <Typography>
                        <p>
                          En accédant à ce site web, vous acceptez d'être lié
                          par les présentes conditions d'utilisation.
                        </p>

                        <h2>Utilisation du site</h2>
                        <p>
                          Ce site est destiné à un usage personnel et non
                          commercial. Vous vous engagez à ne pas utiliser ce
                          site d'une manière qui pourrait endommager,
                          désactiver, surcharger ou altérer le site.
                        </p>

                        <h2>Propriété intellectuelle</h2>
                        <p>
                          Tout le contenu présent sur ce site (textes, images,
                          logos, etc.) est la propriété exclusive d'Anstett
                          Solutions Pro. Toute reproduction ou utilisation non
                          autorisée de ce contenu est strictement interdite.
                        </p>

                        <h2>Limitation de responsabilité</h2>
                        <p>
                          Les informations fournies sur ce site le sont à titre
                          indicatif uniquement. Kokoro Médiation Animale ne peut
                          garantir l'exactitude, l'exhaustivité ou la pertinence
                          de ces informations.
                        </p>

                        <h2>Confidentialité</h2>
                        <p>
                          Les données personnelles collectées via ce site sont
                          traitées conformément à notre politique de
                          confidentialité.
                        </p>

                        <h2>Modification des conditions</h2>
                        <p>
                          Kokoro Médiation Animale se réserve le droit de
                          modifier ces conditions d'utilisation à tout moment.
                          Il est de votre responsabilité de consulter
                          régulièrement ces conditions.
                        </p>

                        <h2>Loi applicable</h2>
                        <p>
                          Ces conditions d'utilisation sont régies par le droit
                          français. En utilisant ce site, vous reconnaissez
                          avoir lu, compris et accepté ces conditions
                          d'utilisation.
                        </p>

                        <footer>
                          <p>
                            &copy; {new Date().getFullYear()} Kokoro Médiation Animale. Tous droits
                            réservés.
                          </p>
                        </footer>
                      </Typography>
                    </Typography>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="ml-2 flex flex-col gap-4">
              <Typography variant="large">Mes réseaux</Typography>
              <SocialLinks />
            </div>
            {/*<div className="flex flex-col gap-4">
              <Typography variant="large">Ressources</Typography>
              <Typography
                as={Link}
                variant="muted"
                className="hover:underline"
                href="/posts"
              >
                Blog
              </Typography>
              <Typography
                as={Link}
                variant="muted"
                className="hover:underline"
                href="/org"
              >
                Tableau de bord
              </Typography>
              <Typography
                as={Link}
                variant="muted"
                className="hover:underline"
                href="/account"
              >
                Compte
              </Typography>
            </div>*/}
          </div>
        </LayoutContent>
      </Layout>
    </footer>
  );
};
