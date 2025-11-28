import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-8 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 border border-transparent shadow-lg hover:shadow-xl",
    secondary: "bg-orange-500 text-white hover:bg-orange-600 border border-transparent shadow-md",
    outline: "bg-transparent text-slate-900 border border-slate-900 hover:bg-slate-50"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};