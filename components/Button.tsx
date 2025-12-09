import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: "sm" | "md" | "lg"; // Added size prop
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', // Default size
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 border border-transparent shadow-lg hover:shadow-xl",
    secondary: "bg-orange-500 text-white hover:bg-orange-600 border border-transparent shadow-md",
    outline: "bg-transparent text-slate-900 border border-slate-900 hover:bg-slate-50"
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};