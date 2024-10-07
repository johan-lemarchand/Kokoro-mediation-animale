"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { usePlausible } from "next-plausible";
import { useToast } from "@/components/ui/use-toast";
import { SectionLayout } from "../../landing/SectionLayout";
import { ContactFormSchema } from "./contact-message.schema";
import { submitContactForm } from "./contact-message.action";
import { z } from "zod";
import { Toaster } from "@/components/ui/toaster";
import { LoadingButton } from "@/features/form/SubmitButton";

const DynamicRecaptcha = dynamic(() => import('@/components/utils/recaptcha'), {
  loading: () => <p>Chargement du reCAPTCHA...</p>,
  ssr: false
});

export function ContactMessageSection() {
  const plausible = usePlausible();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<{ reset: () => void } | null>(null);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRecaptchaVerify = useCallback((token: string) => {
    setRecaptchaToken(token);
  }, []);

  const resetForm = () => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.reset();
      }
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
      setRecaptchaKey((prevKey) => prevKey + 1);
      setPhoneNumber("");
    }, 100);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    if (!recaptchaToken) {
      console.log("No reCAPTCHA token available");
    }

    const formBody = new URLSearchParams();
    formData.forEach((value, key) => {
      formBody.append(key, value.toString());
    });
    if (recaptchaToken) {
      formBody.append("recaptchaToken", recaptchaToken);
    }
    try {
      const validatedData = ContactFormSchema.parse(values);
      const result = await submitContactForm(validatedData);

      if (result.success) {
        toast({
          title: "Succès",
          description: "Le formulaire a été envoyé avec succès !",
          variant: "success",
          duration: 5000,
        });
        resetForm();
      } else {
        toast({
          title: "Erreur",
          description:
            result.error ||
            "Une erreur est survenue lors de l'envoi du formulaire.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.errors.map((err) => err.message));
      } else {
        console.error("Erreur lors de l'envoi de l'email:", error);
        toast({
          title: "Erreur",
          description:
            "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value.slice(0, 10));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <SectionLayout id="contact" className="lg:py-12">
      <Card className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <Typography
          variant="h2"
          className="mb-6 text-center text-3xl font-bold text-primary"
        >
          Contactez-moi
        </Typography>

        <form
          ref={formRef}
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="form_name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                id="form_name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nom"
              />
            </div>

            <div>
              <label
                htmlFor="form_email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                id="form_email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="votre.nom@exemple.com"
              />
            </div>

            <div>
              <label
                htmlFor="form_phone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Numéro de Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="phone"
                id="form_phone"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Numéro de Téléphone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
              />
            </div>

            <div>
              <label
                htmlFor="form_message"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                name="message"
                id="form_message"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Votre message"
              />
            </div>
          </div>

          {formErrors.length > 0 && (
            <div className="mt-4">
              {formErrors.map((error, index) => (
                <p key={index} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="mt-6">
            <DynamicRecaptcha
              key={recaptchaKey}
              onVerify={handleRecaptchaVerify}
              ref={recaptchaRef}
            />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              className={`${buttonVariants({ size: "lg" })} w-full justify-center`}
              onClick={() => {
                plausible("CTASectionCard+ClickJoin", {
                  props: {},
                });
              }}
            >
              Envoyer le message
            </LoadingButton>
          </div>
        </form>
      </Card>
      <Toaster />
    </SectionLayout>
  );
}
