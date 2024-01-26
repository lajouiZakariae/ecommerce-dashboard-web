import { ButtonHTMLAttributes, forwardRef } from 'react';

type element = HTMLButtonElement;

interface ButtonProps extends ButtonHTMLAttributes<element> {
    variant: 'error' | 'info' | 'success' | 'warning' | 'primary';
}

const Button = forwardRef<element, ButtonProps>(
    ({ variant, children, ...other }) => {
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
    },
);

export default Button;
