import React, { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

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

  useEffect(() => {
    if (isOpen) {
      if (typeof content === "string") {
        setNewContent(content);
        setImagePreview(content);
      }
    }
  }, [isOpen, content]);

  const handleSave = () => {
    onSave(newContent);
    onClose();
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
            <button onClick={onClose} className="rounded bg-gray-200 px-4 py-2 text-gray-700">Annuler</button>
            <button onClick={handleSave} className="rounded bg-blue-600 px-4 py-2 text-white">Enregistrer</button>
          </div>
        </div>
      </div>
    </>
  );
};