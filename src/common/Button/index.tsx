import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'error' | 'info' | 'success' | 'warning' | 'primary';
}

export default function Button({ variant, children, ...other }: ButtonProps) {
    const variants = {
        error: 'text-error hover:bg-error',
        info: 'text-info hover:bg-info',
        success: 'text-success hover:bg-success',
        warning: 'text-warning hover:bg-warning',
        primary: 'text-primary hover:bg-primary',
    };

    return (
        <button
            className={`btn btn-sm border-none shadow-none hover:bg-opacity-15 ${variants[variant]}`}
            {...other}
        >
            {children}
        </button>
    );
}
