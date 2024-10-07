import { useState, useEffect } from "react";
import Image from "next/image";
import { useEditableContent } from "@/contexts/EditableContentContext";

interface EditableImageProps {
  initialSrc: string;
  contentId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onEdit: (contentId: string) => void;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
}

export const EditableImage = ({ 
  initialSrc, 
  contentId, 
  alt, 
  width, 
  height, 
  className, 
  onEdit,
  objectFit = "cover",
  priority = false
}: EditableImageProps) => {
  const { getContent } = useEditableContent();
  const [src, setSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const content = getContent(contentId);
      setSrc(content || initialSrc);
      setIsLoading(false);
    };
    fetchContent();
  }, [contentId, getContent, initialSrc]);

  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-gray-200 ${className || ''}`}
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : '0',
          paddingBottom: !height ? '100%' : '0',
          aspectRatio: width && height ? `${width} / ${height}` : 'auto'
        }}
      />
    );
  }

  return (
    <div className={`relative ${className || ''}`} style={{ width: 'auto', height: 'auto' }}>
      <Image
        src={src}
        alt={alt}
        layout={width && height ? "fixed" : "responsive"}
        width={width || 100}
        height={height || 100}
        objectFit={objectFit}
        className={className}
        onClick={() => onEdit(contentId)}
        priority={priority}
      />
    </div>
  );
};
