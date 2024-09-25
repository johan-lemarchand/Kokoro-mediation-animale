import React, { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { EditableControls } from "./EditableControls";

interface EditableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: string | ReactNode;
  onSave: (newContent: string) => void;
  type: "text" | "image";
}

export const EditableDrawer = ({ isOpen, onClose, content, onSave, type }: EditableDrawerProps) => {
  const [newContent, setNewContent] = useState<string>(typeof content === "string" ? content : "");
  const [imagePreview, setImagePreview] = useState<string>(typeof content === "string" ? content : "");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (typeof content === "string") {
        setNewContent(content);
        setImagePreview(content);
      }
    }
  }, [isOpen, content]);

  const handleSave = async () => {
    try {
      await onSave(newContent);
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
        setNewContent(reader.result as string);
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