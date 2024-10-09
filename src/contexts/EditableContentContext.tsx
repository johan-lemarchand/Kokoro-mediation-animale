import React, { createContext, useContext, useState, useCallback } from 'react';

type ContentType = { [key: string]: string };

interface EditableContentContextProps {
  content: ContentType;
  setContent: (contentIdOrUpdater: string | ((prev: ContentType) => ContentType), newContent?: string) => void;
  getContent: (id: string) => string;
}

const EditableContentContext = createContext<EditableContentContextProps | undefined>(undefined);

export const EditableContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContentState] = useState<ContentType>({});

  const setContent = useCallback((contentIdOrUpdater: string | ((prev: ContentType) => ContentType), newContent?: string) => {
    if (typeof contentIdOrUpdater === 'function') {
      setContentState(contentIdOrUpdater);
    } else if (typeof newContent === 'string') {
      setContentState(prev => ({ ...prev, [contentIdOrUpdater]: newContent }));
    }
  }, []);

  const getContent = useCallback((id: string) => {
    return content[id] || '';
  }, [content]);

  return (
    <EditableContentContext.Provider value={{ content, setContent, getContent }}>
      {children}
    </EditableContentContext.Provider>
  );
};

export const useEditableContent = () => {
  const context = useContext(EditableContentContext);
  if (!context) {
    throw new Error('useEditableContent must be used within an EditableContentProvider');
  }
  return context;
};