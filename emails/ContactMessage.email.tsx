import { SiteConfig } from "@/site-config";
import { Preview, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";
import { EmailSection, EmailText } from "./utils/components.utils";

export default function ContactMessageEmail({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return (
    <EmailLayout>
      <Preview>Nouveau message de contact de {name}</Preview>
      <EmailSection>
        <EmailText>Bonjour,</EmailText>
        <EmailText>
          Vous avez reçu un nouveau message de contact avec les détails suivants
          :
        </EmailText>
        <EmailText>
          <strong>Nom :</strong> {name}
          <br />
          <strong>Email :</strong> {email}
          <br />
          <strong>Téléphone :</strong> {phone}
        </EmailText>
        <EmailText>
          <strong>Message :</strong>
          <br />
          {message}
        </EmailText>
      </EmailSection>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- L'équipe {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
