import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditableContent } from '@/contexts/EditableContentContext';
import { useToast } from '@/components/ui/use-toast';

type DrawerType = "text" | "image";

export function useEditableContentManager(initialContentIds: string[]) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerType, setDrawerType] = useState<DrawerType>("text");
  const [currentContentId, setCurrentContentId] = useState("");
  const { content, setContent, getContent } = useEditableContent();
  const [isInitialContentLoaded, setIsInitialContentLoaded] = useState(false);
  const { toast } = useToast();
  
  const contentIdsRef = useRef(initialContentIds);

  const fetchInitialContent = useCallback(async () => {
    if (isInitialContentLoaded) return;

    try {
      const response = await fetch('/api/get-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentIds: contentIdsRef.current }),
      });

      if (response.ok) {
        const data = await response.json();
        setContent(prev => ({ ...prev, ...data }));
        setIsInitialContentLoaded(true);
      } else {
        throw new Error('Erreur lors de la récupération du contenu initial');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu initial:', error);
    }
  }, [setContent, isInitialContentLoaded]);

  useEffect(() => {
    fetchInitialContent();
  }, [fetchInitialContent]);

  const handleOpenDrawer = (type: DrawerType, contentId: string, content: string) => {
    setDrawerType(type);
    setCurrentContentId(contentId);
    
    // Utilisez getContent pour obtenir le contenu le plus récent
    const currentContent = getContent(contentId) || content;
    setDrawerContent(currentContent);
    
    setIsDrawerOpen(true);
  };

  const resetDrawerState = () => {
    setIsDrawerOpen(false);
    setDrawerContent("");
    setCurrentContentId("");
  };

  const handleCancel = () => {
    resetDrawerState();
  };

  const handleSave = async (contentId: string, newContent: string | FormData) => {
    try {
      let response;

      if (newContent instanceof FormData) {
        response = await fetch('/api/update-content', {
          method: 'POST',
          body: newContent,
        });
      } else {
        const formData = new FormData();
        formData.append('id', contentId);
        formData.append('type', drawerType);
        formData.append('content', newContent);

        response = await fetch('/api/update-content', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du contenu');
      }

      const updatedContent = await response.json();
      setContent(prev => ({ ...prev, [contentId]: updatedContent.content }));
      toast({
        title: "Contenu mis à jour",
        description: "Le contenu a été sauvegardé avec succès.",
        variant: "success",
      });
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du contenu:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde du contenu.",
        variant: "destructive",
      });
    }
  };

  return {
    isDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
    getContent,
    currentContentId,
    handleCancel,
  };
}