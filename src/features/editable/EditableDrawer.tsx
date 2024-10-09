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
      setNewContent(content);
      setImagePreview(content);
    }
  }, [isOpen, content]);

  const handleSave = async () => {
    try {
      if (type === "image") {
        const formData = new FormData();
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append('file', blob, 'image.jpg');
        formData.append('type', 'image');
        formData.append('id', contentId);

        console.log('FormData envoyé:', 
          Array.from(formData.entries()).reduce((obj, [key, value]) => 
            ({ ...obj, [key]: value instanceof Blob ? `Blob (${value.size} bytes)` : value }), {})
        );

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
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde. Veuillez réessayer.",
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
        setImagePreview(reader.result as string);
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
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="h-40 w-full rounded border p-2"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Image src={imagePreview} alt="Image actuelle" width={200} height={200} className="mb-4" />
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