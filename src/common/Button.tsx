import { ButtonHTMLAttributes, forwardRef } from 'react';

type element = HTMLButtonElement;

interface ButtonProps extends ButtonHTMLAttributes<element> {
    variant: 'error' | 'info' | 'success' | 'warning' | 'primary';
    size: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<element, ButtonProps>(
    ({ variant, size = 'md', className, children, ...other }, ref) => {
        const variants = {
            error: 'text-error hover:bg-error',
            info: 'text-info hover:bg-info',
            success: 'text-success hover:bg-success',
            warning: 'text-warning hover:bg-warning',
            primary: 'text-primary hover:bg-primary',
        };

        const sizes = {
            sm: 'btn-sm',
            md: 'btn-md',
            lg: 'btn-lg',
        };

        return (
            <button
                className={`btn ${sizes[size]} border-none shadow-none dark:bg-boxdark-2 hover:bg-opacity-15 ${variants[variant]} ${className}`}
                ref={ref}
                {...other}
            >
                {children}
            </button>
        );
    },
);

export default Button;
