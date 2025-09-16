
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  
  const variantClasses = {
    primary: 'border-transparent text-white bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    secondary: 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-sky-500',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${props.className || ''}`.trim();

  return (
    <button
      {...props}
      className={finalClassName}
    >
      {children}
    </button>
  );
};

export default Button;
