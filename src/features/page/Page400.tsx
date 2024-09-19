import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export function Page400() {
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="max-w-lg space-y-3 text-center">
        <Typography variant="code">400</Typography>
        <Typography variant="h1">Oh non ! Erreur inattendue.</Typography>
        <Typography>
          Il semble que nous rencontrions quelques difficultés techniques. Ne
          vous inquiétez pas, notre équipe y travaille. En attendant, essayez de
          rafraîchir la page ou de nous rendre visite un peu plus tard.
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className={buttonVariants({ variant: "invert" })}>
          Retourner à l'accueil
        </Link>
      </div>
    </main>
  );
}
