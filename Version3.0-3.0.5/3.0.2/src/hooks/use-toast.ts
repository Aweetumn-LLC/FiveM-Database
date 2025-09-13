
import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  warning: (message: string) => sonnerToast.warning(message),
  default: (props: string | { title?: string; description?: string; variant?: "default" | "destructive"; duration?: number }) => {
    if (typeof props === "string") {
      return sonnerToast(props);
    }
    
    const { title, description, variant, duration } = props;
    return sonnerToast(title || "", {
      description,
      duration,
    });
  }
};

export { Toaster } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};
