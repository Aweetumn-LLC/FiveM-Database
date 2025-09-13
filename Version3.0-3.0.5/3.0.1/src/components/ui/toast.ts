
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

export const toast = {
  success: (message: string) => {
    return sonnerToast.success(message);
  },
  error: (message: string) => {
    return sonnerToast.error(message);
  },
  info: (message: string) => {
    return sonnerToast.info(message);
  },
  warning: (message: string) => {
    return sonnerToast.warning(message);
  },
  default: (props: ToastProps | string) => {
    if (typeof props === "string") {
      return sonnerToast(props);
    }
    return sonnerToast(props.title || "", {
      description: props.description,
      duration: props.duration,
    });
  },
};
