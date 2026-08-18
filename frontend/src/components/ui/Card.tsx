import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300 backdrop-blur-md';

  const variantStyles = {
    default: 'bg-slate-900/90 text-slate-100 border border-slate-800 shadow-xl',
    glass: 'bg-gradient-to-b from-slate-900/80 to-slate-950/90 text-slate-100 border border-emerald-500/20 shadow-2xl shadow-emerald-950/20',
    bordered: 'bg-slate-950 text-slate-100 border border-emerald-900/50',
  };

  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-emerald-900/30'
    : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
