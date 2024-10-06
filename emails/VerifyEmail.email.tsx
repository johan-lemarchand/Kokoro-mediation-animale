import { SiteConfig } from "@/site-config";
import { Preview, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";
import { EmailLink, EmailSection, EmailText } from "./utils/components.utils";

export default function VerifyEmail({ url }: { url: string }) {
  return (
    <EmailLayout>
      <Preview>Veuillez cliquer sur le lien ci-dessous pour vous connecter à votre compte.</Preview>
      <EmailSection>
        <EmailText>
          <EmailLink href={url}>
            👉 Cliquez ici pour vérifier votre adresse e-mail 👈
          </EmailLink>
        </EmailText>
        <EmailText>
          Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.
        </EmailText>
      </EmailSection>
      <Text className="text-lg leading-6">
        Meilleur,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
