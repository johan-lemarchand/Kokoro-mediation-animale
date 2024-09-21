import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/features/form/SubmitButton";

interface EditableControlsProps {
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export const EditableControls: React.FC<EditableControlsProps> = ({ onCancel, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
      toast({
        title: "Succès",
        description: "Modifications enregistrées avec succès",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 flex justify-end gap-2">
      <Button onClick={onCancel} variant="outline" size="sm" disabled={isLoading}>
        Annuler
      </Button>
      <LoadingButton
        onClick={handleSave}
        loading={isLoading}
        size="sm"
      >
        Valider
      </LoadingButton>
    </div>
  );
};
