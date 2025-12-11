import React from "react";

type CardVariant = "card" | "header" | "title" | "content";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  variant: CardVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const CardBase = ({ 
  children, 
  variant, 
  className = "" ,
  onClick,
}: BaseCardProps) => {
  const styles: Record<CardVariant, string> = {
    card: "rounded-lg border bg-white shadow p-4",
    header: "pb-2 flex flex-col",
    title: "text-lg font-semibold",
    content: "pt-2",
  };

  return (
    <div 
    className={`${styles[variant]} ${className}`}
    onClick={onClick}
    >
      {children}
    </div>
  );
};
