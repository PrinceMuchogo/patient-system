import { LucideIceCreamCone } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string ;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-3">
        {/* {Icon && <Icon className="h-10 w-10 text-muted-foreground" />} */}
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground text-center max-w-[320px]">
            {description}
          </p>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}