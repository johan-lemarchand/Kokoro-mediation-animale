import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { EditableControls } from "./EditableControls";

interface EditableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onSave: (contentId: string, newContent: string | FormData) => void;
  type: "text" | "image";
  contentId: string;
}

export const EditableDrawer = ({ isOpen, onClose, content, onSave, type, contentId }: EditableDrawerProps) => {
  const [newContent, setNewContent] = useState<string>(content);
  const [imagePreview, setImagePreview] = useState<string>(content);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      console.log("Drawer opened with content:", content);
      setNewContent(content || '');
      setImagePreview(content || '');
    }
  }, [isOpen, content, type]);

  const isValidImageSrc = (src: string) => {
    return typeof src === 'string' && (src.startsWith('/') || src.startsWith('http') || src.startsWith('data:image/'));
  };

  const handleSave = async () => {
    try {
      if (type === "image") {
        if (!isValidImageSrc(imagePreview)) {
          throw new Error("Source d'image invalide");
        }
        const formData = new FormData();
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append('file', blob, 'image.jpg');
        formData.append('type', 'image');
        formData.append('id', contentId);

        onSave(contentId, formData);
      } else {
        onSave(contentId, newContent);
      }

      toast({
        title: "Succès",
        description: "Modifications enregistrées avec succès",
        variant: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la sauvegarde. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isValidImageSrc(result)) {
          setImagePreview(result);
        } else {
          toast({
            title: "Erreur",
            description: "Format d'image non valide",
            variant: "destructive",
            duration: 5000,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-40 bg-black opacity-30" onClick={onClose}></div>
        <div className="relative z-50 flex w-full max-w-md flex-col bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Modifier {type === "text" ? "le texte" : "l'image"}</h2>
            <button onClick={onClose} className="text-gray-700">X</button>
          </div>
          <div className="mb-4 mt-2">
            {type === "text" ? (
              <textarea
                value={newContent || ''}
                onChange={(e) => setNewContent(e.target.value)}
                className="h-40 w-full rounded border p-2"
              />
            ) : (
              <div className="flex flex-col items-center">
                {isValidImageSrc(imagePreview) ? (
                  <Image src={imagePreview} alt="Image actuelle" width={200} height={200} className="mb-4" />
                ) : (
                  <div className="mb-4 flex size-[200px] items-center justify-center bg-gray-200 text-gray-500">
                    Image invalide ou non chargée
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded border p-2"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <EditableControls onCancel={onClose} onSave={handleSave} />
          </div>
        </div>
      </div>
    </>
  );
};