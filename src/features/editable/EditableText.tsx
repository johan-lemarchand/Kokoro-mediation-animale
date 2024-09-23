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
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(getContent(contentId) || initialText);
  }, [contentId, getContent, initialText]);

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