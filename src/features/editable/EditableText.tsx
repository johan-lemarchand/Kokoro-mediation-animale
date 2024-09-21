import { useState, useEffect, useRef } from "react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { EditableControls } from "./EditableControls";

interface EditableTextProps {
  initialText: string;
  contentId: string;
  variant?: "link" | "small" | "code" | "h1" | "h2" | "h3" | "p" | "default" | "quote" | "lead" | "large" | "muted" | "smallPrimary";
  className?: string;
  renderHTML?: boolean;
}

export const EditableText = ({ initialText, contentId, variant = "p", className, renderHTML = false }: EditableTextProps) => {
  const { data: session } = useSession();
  const [text, setText] = useState(initialText);
  const [originalText, setOriginalText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
    setTextareaHeight(`${element.scrollHeight}px`);
  };

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/get-content?id=${contentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setText(data.content);
            setOriginalText(data.content);
          } else {
            const createResponse = await fetch('/api/update-content', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type: 'text', content: initialText, id: contentId }),
            });
            if (createResponse.ok) {
              const createData = await createResponse.json();
              setText(createData.content);
              setOriginalText(createData.content);
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error);
        setText(initialText);
        setOriginalText(initialText);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [contentId, initialText]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (session) {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setText(originalText);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const response = await fetch('/api/update-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'text', content: text, id: contentId }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    setOriginalText(text);
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isEditing && session) {
    return (
      <div className="relative z-50 w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none overflow-hidden rounded border p-2"
          style={{ minHeight: '2em' }}
        />
        <EditableControls
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </div>
    );
  }

  const content = renderHTML ? (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  ) : text;

  return (
    <Typography 
      variant={variant} 
      onClick={handleEdit} 
      className={`w-full ${className || ''}`}
    >
      {content}
    </Typography>
  );
};