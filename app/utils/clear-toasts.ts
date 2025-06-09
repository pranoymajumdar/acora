import { toast } from "sonner";

export const clearToasts = () =>
  toast.getToasts().forEach((value) => toast.dismiss(value.id));
