import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { EditableControls } from "./EditableControls";

interface EditableImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  contentId: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
}

export const EditableImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  contentId, 
  className = "", 
  objectFit = "cover",
  priority = false
}: EditableImageProps) => {
  const { data: session } = useSession();
  const [imageSrc, setImageSrc] = useState(src);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/get-content?id=${contentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setImageSrc(data.content);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  const handleEdit = () => {
    if (session) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const response = await fetch('/api/update-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'image', content: imageSrc, id: contentId }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isEditing && session) {
    return (
      <div className="absolute left-0 z-50">
        <input
          type="text"
          value={imageSrc}
          onChange={(e) => setImageSrc(e.target.value)}
          className="w-full rounded border p-2"
        />
        <EditableControls
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div onClick={handleEdit} className={`relative ${className}`} style={{ width, height }}>
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
