import { useState, useEffect } from "react";
import Image from "next/image";
import { useEditableContent } from "@/contexts/EditableContentContext";
import { supabase } from '@/lib/supabase';

interface EditableImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  contentId: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
  onEdit: (contentId: string) => void;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const EditableImage = ({
    src,
    alt,
    width,
    height,
    contentId,
    className = "",
    objectFit = "cover",
    priority = false,
    onEdit
  }: EditableImageProps) => {
    const { getContent } = useEditableContent();
    const [imageSrc, setImageSrc] = useState(src);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      const fetchImage = async () => {
        const content = getContent(contentId) || src;
        if (content.startsWith('images/')) {
          const { data } = supabase.storage.from('kokoro').getPublicUrl(content);
          setImageSrc(data?.publicUrl || src);
        } else {
          setImageSrc(content);
        }
      };

      fetchImage();
    }, [contentId, getContent, src]);

    const isValidSrc = typeof imageSrc === 'string' && (imageSrc.startsWith('/') || imageSrc.startsWith('http'));

    if (!isValidSrc) {
      return (
        <div onClick={() => onEdit(contentId)} className={`relative ${className} flex items-center justify-center bg-gray-200 text-gray-500`} style={{ width, height }}>
          Image invalide
        </div>
      );
    }

    return (
      <div onClick={() => onEdit(contentId)} className={`relative ${className}`} style={{ width, height }}>
        <Image
          src={imageSrc}
          alt={alt}
          fill={width === undefined || height === undefined}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          style={{ objectFit }}
          priority={priority}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={priority ? "eager" : "lazy"}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
            Image non disponible
          </div>
        )}
      </div>
    );
};