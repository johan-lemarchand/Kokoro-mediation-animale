import { useState, useEffect } from "react";
import { Typography } from "@/components/ui/typography";
import { useEditableContent } from "@/contexts/EditableContentContext";

interface EditableTextProps {
  initialText: string;
  contentId: string;
  variant?: "link" | "small" | "code" | "h1" | "h2" | "h3" | "p" | "default" | "quote" | "lead" | "large" | "muted" | "smallPrimary";
  className?: string;
  renderHTML?: boolean;
  onEdit: (contentId: string) => void;
}

export const EditableText = ({ initialText, contentId, variant = "p", className, renderHTML = false, onEdit }: EditableTextProps) => {
  const { getContent } = useEditableContent();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      // Simuler un délai de chargement pour voir l'effet
      await new Promise(resolve => setTimeout(resolve, 1000));
      const content = getContent(contentId);
      setText(content || initialText);
      setIsLoading(false);
    };
    fetchContent();
  }, [contentId, getContent, initialText]);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`} style={{ height: '1em', width: '100%' }}>
        <div className="h-full w-full rounded bg-gray-200"></div>
      </div>
    );
  }

  const content = renderHTML ? (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  ) : text;

  return (
    <Typography 
      variant={variant} 
      onClick={() => onEdit(contentId)} 
      className={`w-full ${className || ''}`}
    >
      {content}
    </Typography>
  );
};