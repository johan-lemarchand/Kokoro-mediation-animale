import { useState, useEffect } from "react";
import Image from "next/image";
import { useEditableContent } from "@/contexts/EditableContentContext";

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

  useEffect(() => {
    setImageSrc(getContent(contentId) || src);
  }, [contentId, getContent, src]);

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
      />
    </div>
  );
};