
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border border-border shadow-lg",
          title: "font-semibold",
          description: "text-muted-foreground",
          error: "bg-destructive text-destructive-foreground",
          success: "bg-green-500 text-white",
          warning: "bg-amber-500 text-white",
          info: "bg-blue-500 text-white"
        }
      }}
    />
  );
}

export { toast } from "@/components/ui/toast";
