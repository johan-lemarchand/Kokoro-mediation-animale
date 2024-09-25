import React, { createContext, useContext, useState, useCallback } from 'react';

interface EditableContentContextProps {
  content: { [key: string]: string };
  setContent: (id: string, newContent: string) => void;
  getContent: (id: string) => string;
}

const EditableContentContext = createContext<EditableContentContextProps | undefined>(undefined);

export const EditableContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContentState] = useState<{ [key: string]: string }>({});

  const setContent = useCallback((contentId: string, newContent: string) => {
    setContentState(prevContent => ({
      ...prevContent,
      [contentId]: newContent
    }));
  }, []);

  const getContent = (id: string) => {
    return content[id] || '';
  };

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