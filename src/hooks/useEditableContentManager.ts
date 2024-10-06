import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditableContent } from '@/contexts/EditableContentContext';

export function useEditableContentManager(initialContentIds: string[]) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerType, setDrawerType] = useState<"text" | "image">("text");
  const [currentContentId, setCurrentContentId] = useState("");
  const { setContent } = useEditableContent();
  const [isInitialContentLoaded, setIsInitialContentLoaded] = useState(false);
  
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
        contentIdsRef.current.forEach((contentId) => {
          setContent(contentId, data[contentId]);
        });
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

  const handleOpenDrawer = async (type: "text" | "image", contentId: string, initialContent: string) => {
    try {
      const response = await fetch('/api/get-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contentId }),
      });
      if (response.ok) {
        const data = await response.json();
        setDrawerContent(data[contentId] || initialContent);
        setDrawerType(type);
        setCurrentContentId(contentId);
        setIsDrawerOpen(true);
      } else {
        throw new Error('Erreur lors de la récupération du contenu');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      setDrawerContent(initialContent);
      setDrawerType(type);
      setCurrentContentId(contentId);
      setIsDrawerOpen(true);
    }
  };

  const handleSave = async (newContent: string) => {
    const response = await fetch('/api/update-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: drawerType, content: newContent, id: currentContentId }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    setContent(currentContentId, newContent);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    drawerType,
    handleOpenDrawer,
    handleSave,
  };
}