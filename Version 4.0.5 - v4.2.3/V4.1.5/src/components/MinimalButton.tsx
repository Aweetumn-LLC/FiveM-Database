
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface MinimalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "text";
  icon?: boolean;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

const MinimalButton = ({ 
  children, 
  onClick, 
  className = "",
  variant = "default",
  icon = false,
  iconPosition = "right",
  disabled = false
}: MinimalButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 text-sm tracking-wider font-medium relative group transition-all duration-300",
        variant === "default" 
          ? "bg-white text-black hover:bg-white/90" 
          : variant === "outline"
          ? "bg-transparent border border-white/20 text-white hover:bg-white/5"
          : "bg-transparent text-white hover:bg-white/5",
        disabled && "opacity-50 cursor-not-allowed hover:opacity-50 hover:bg-transparent",
        className
      )}
    >
      <span className="flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </span>
      {variant !== "text" && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
      )}
    </button>
  );
};

export default MinimalButton;
