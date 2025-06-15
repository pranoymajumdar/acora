import { toast } from "sonner";

export function clearToasts(): void {
  return toast.getToasts().forEach(value => toast.dismiss(value.id));
}
