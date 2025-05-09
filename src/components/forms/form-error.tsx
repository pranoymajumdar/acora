import { LucideAlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export const FormError = ({ error }: { error: string }) => {
  return (
    <Alert variant="destructive">
      <LucideAlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
