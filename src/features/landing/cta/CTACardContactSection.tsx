"use client";

import React, { useState, useRef, useEffect } from 'react';
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { usePlausible } from "next-plausible";
import { useToast } from '@/components/ui/use-toast';
import { SectionLayout } from "../SectionLayout";
import Recaptcha from '@/components/utils/recaptcha';

export function CTASectionCardContact() {
  const plausible = usePlausible();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setRecaptchaToken(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const errors = validateForm(formData);

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!recaptchaToken) {
      console.log('No reCAPTCHA token available');
    }

    const formBody = new URLSearchParams();
    formData.forEach((value, key) => {
      formBody.append(key, value.toString());
    });
    if (recaptchaToken) {
      formBody.append('recaptchaToken', recaptchaToken);
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formBody.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        setFormErrors([]);
        toast({
          title: 'Succès',
          description: 'Le formulaire a été envoyé avec succès !',
          variant: 'success',
          duration: 5000,
        });
        resetForm();
      } else {
        const errorData = await response.json();
        setFormErrors([errorData.error]);
        if (errorData.errorCodes) {
          errorData.errorCodes.forEach((code: string) => {
            console.error('reCAPTCHA Error Code:', code);
          });
        }
        toast({
          title: 'Erreur',
          description: errorData.error || "Une erreur est survenue lors de l'envoi du formulaire.",
          variant: 'destructive',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setFormErrors([(error as Error).message]);
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  function validateForm(formData: FormData): string[] {
    const errors = [];

    if (!formData.get('name')) {
      errors.push('Veuillez entrer votre nom.');
    }
    if (
      !formData.get('email') ||
      !/\S+@\S+\.\S+/.test(formData.get('email') as string)
    ) {
      errors.push('Veuillez entrer une adresse email valide.');
    }
    if (
      !formData.get('phone') ||
      !/^\d{10}$/.test(formData.get('phone') as string)
    ) {
      errors.push('Veuillez entrer un numéro de téléphone valide.');
    }
    if (!formData.get('message')) {
      errors.push('Veuillez entrer votre message.');
    }

    return errors;
  }

  if (!isMounted) {
    return null; // ou un placeholder si nécessaire
  }

  return (
    <SectionLayout id="contact" className="lg:py-12">
      <Card className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <Typography variant="h2" className="mb-6 text-center text-3xl font-bold text-primary">
          Contactez-moi
        </Typography>
        
        <form ref={formRef} className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="form_name" className="mb-1 block text-sm font-medium text-gray-700">
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
              <label htmlFor="form_email" className="mb-1 block text-sm font-medium text-gray-700">
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
              <label htmlFor="form_phone" className="mb-1 block text-sm font-medium text-gray-700">
                Numéro de Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="phone"
                id="form_phone"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Numéro de Téléphone"
                pattern="[0-9]{10}"
              />
            </div>
            
            <div>
              <label htmlFor="form_message" className="mb-1 block text-sm font-medium text-gray-700">
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
            <Recaptcha onVerify={handleRecaptchaVerify} />
            <button
              type="submit"
              className={`${buttonVariants({ size: "lg" })} w-full justify-center`}
              onClick={() => {
                plausible("CTASectionCard+ClickJoin", {
                  props: {},
                });
              }}
            >
              Envoyer le message
            </button>
          </div>
        </form>
      </Card>
    </SectionLayout>
  );
}
