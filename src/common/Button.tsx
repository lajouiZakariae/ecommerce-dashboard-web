import { ButtonHTMLAttributes, forwardRef } from 'react';

type element = HTMLButtonElement;

interface ButtonProps extends ButtonHTMLAttributes<element> {
    purpose: 'error' | 'info' | 'success' | 'warning' | 'primary';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<element, ButtonProps>(
    ({ purpose, size = 'md', className, children, ...other }, ref) => {
        const colors = {
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
                className={`btn ${size ? sizes[size] : ''} border-none shadow-none hover:bg-opacity-15 ${colors[purpose]} ${className}`}
                ref={ref}
                {...other}
            >
                {children}
            </button>
        );
    },
);

export default Button;
