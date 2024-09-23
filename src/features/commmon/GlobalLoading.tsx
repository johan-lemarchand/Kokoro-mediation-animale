import { Loader2 } from "lucide-react";

export const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-80">
      <Loader2 className="size-12 animate-spin text-primary" />
      <span className="ml-2 text-lg font-semibold">Chargement...</span>
    </div>
  );
};
