import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface EditableWrapperProps {
  children: (isEditable: boolean) => ReactNode;
}

export const EditableWrapper = ({ children }: EditableWrapperProps) => {
  const { data: session } = useSession();
  const isEditable = !!session;

  return <>{children(isEditable)}</>;
};