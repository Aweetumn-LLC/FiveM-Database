
import { toast, Toaster } from "sonner";

export { toast, Toaster };

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "info" | "warning";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

// Customize sonner styles in index.css or use the data-theme attribute on Toaster component
