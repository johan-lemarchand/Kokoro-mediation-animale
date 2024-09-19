"use server";

import { ContactFormSchemaType } from "./contact-message.schema";
import { sendEmail } from "@/lib/mail/sendEmail";
import ContactMessageEmail from "@email/ContactMessage.email";

export async function submitContactForm(values: ContactFormSchemaType) {
  try {
    await sendEmail({
      to: "delivered@resend.dev",
      subject: `Nouveau message de contact de ${values.name}`,
      react: ContactMessageEmail({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, error: "Erreur lors de l'envoi du message" };
  }
}
