import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z
    .string()
    .regex(
      /^\d{10}$/,
      "Le numéro de téléphone doit contenir exactement 10 chiffres",
    )
    .refine(
      (val) => /^\d+$/.test(val),
      "Le numéro de téléphone ne doit contenir que des chiffres",
    ),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
