import { cn } from "@/lib/utils";
import React from "react";

interface BentoCardData {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  background?: React.ReactNode;
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: BentoCardData[];
  columns?: number;
  rowHeight?: string;
}

export const BentoGrid = ({
  cards,
  columns = 3,
  rowHeight = "auto",
  className,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        `grid w-full gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} bg-transparent p-4 md:p-6`,
        className
      )}
      {...props}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            tabIndex={0}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 flex flex-col justify-end",
              "h-[15rem]",
              "bg-white/40 dark:bg-white/5 backdrop-blur-[1px]", // stronger base backdrop blur
              "border border-black/10 dark:border-white/10",
              "shadow-inner shadow-black/10 dark:shadow-white/10",
              "text-black dark:text-white",
              "group transition-all duration-300 ease-in-out focus:outline-none",
              card.className
            )}
          >
            {card.background && (
              // blur the background element and animate blur on hover or focus (for touch)
              <div className="absolute inset-0 z-0 -m-1 filter group-hover:blur-xs group-focus:blur-xs group-focus-within:blur-xs transition-all duration-300">
                {card.background}
              </div>
            )}

            {/* Hover-revealed content (also revealed on focus for touch) */}
            <div className="relative z-10 w-full">
              <div
                className={cn(
                  "flex flex-col justify-end h-full",
                  "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
                  "transition-all duration-300 ease-out"
                )}
              >
                <Icon className="h-5 w-5 text-current mb-2" />
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-white/60">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Hover overlay effect (also on focus) */}
            <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/10 group-focus:bg-black/10 group-focus-within:bg-black/10 dark:group-hover:bg-white/5 dark:group-focus:bg-white/5 dark:group-focus-within:bg-white/5 rounded-2xl blur-xs" />
          </div>
        );
      })}
    </div>
  );
};
