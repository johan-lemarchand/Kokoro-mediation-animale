"use client";

import React, { useEffect, useState } from 'react';
import HeaderLayout from '../layouts/HeaderLayout';
import { useSession } from "next-auth/react";
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type GalleryImage = { name: string; src: string; isLocal?: boolean };

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const { data: session } = useSession();
  const isEditable = !!session;

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const { data, error } = await supabase.storage
        .from('kokoro')
        .list('images/galerie/');

      if (error || !data) {
       // console.error('Erreur lors de la récupération des images depuis Supabase:', error);
        // fallback to local images served from /public/images/galerie via API route
        const res = await fetch('/api/local-gallery');
        if (res.ok) {
          const json = await res.json();
          const localImages: GalleryImage[] = (json.images || []).map((name: string) => ({
            name,
            src: `/images/galerie/${name}`,
            isLocal: true,
          }));
          setImages(localImages);
        } else {
          setImages([]);
        }
      } else {
        const remoteImages = data.map((file: any) => ({
          name: file.name,
          src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/kokoro/images/galerie/${file.name}`,
          isLocal: false,
        }));
        setImages(remoteImages);
      }
    } catch (err) {
      //console.error('Erreur générale lors de la récupération des images:', err);
      const res = await fetch('/api/local-gallery');
      if (res.ok) {
        const json = await res.json();
        const localImages: GalleryImage[] = (json.images || []).map((name: string) => ({
          name,
          src: `/images/galerie/${name}`,
          isLocal: true,
        }));
        setImages(localImages);
      } else {
        setImages([]);
      }
    }
  }

  async function addImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from('kokoro')
          .upload(`images/galerie/${fileName}`, file);

        if (error) {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        } else {
          await fetchImages();
        }
      }
    };
    input.click();
  }

  async function deleteImage(imageName: string) {
    const found = images.find((i) => i.name === imageName);
    if (found?.isLocal) {
      // Local fallback: just remove from state
      setImages((prev) => prev.filter((i) => i.name !== imageName));
      return;
    }

    const { error } = await supabase.storage
      .from('kokoro')
      .remove([`images/galerie/${imageName}`]);

    if (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
    } else {
      await fetchImages();
    }
  }

  return (
    <HeaderLayout>
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-4 text-2xl font-bold text-primary">
            Galerie d'images
          </h1>
          <p className="mb-8 text-gray-600">
            Découvrez ma collection d'images.{" "}
            {isEditable &&
              "Cliquez sur le '+' pour ajouter une nouvelle image."}
          </p>
          {images.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600">
                Aucune image n'est disponible pour le moment.
              </p>
              <p className="mt-2 text-gray-500">
                Revenez bientôt, des photos seront ajoutées très prochainement !
              </p>
              {isEditable && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {isEditable && (
                        <div
                          className="relative aspect-square w-full cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                          onClick={addImage}
                        >
                          <Plus
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
                            size={32}
                          />
                        </div>
                      )}
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image.src}
                            alt={`Image ${index + 1}`}
                            width={300}
                            height={300}
                            className="h-auto w-full"
                          />
                          {isEditable && (
                            <button
                              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                              onClick={() => deleteImage(image.name)}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {isEditable && (
                <div
                  className="relative aspect-square w-full cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                  onClick={addImage}
                >
                  <Plus
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
                    size={32}
                  />
                </div>
              )}
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={300}
                    className="h-auto w-full"
                  />
                  {isEditable && (
                    <button
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
                      onClick={() => deleteImage(image.name)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </HeaderLayout>
  );
}