import { ButtonHTMLAttributes, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLElement> {
    color: 'success' | 'primary';
}

const ButtonLoading = forwardRef<HTMLButtonElement, Props>(
    ({ color, children, className, ...other }, ref) => {
        const colors = {
            success: 'text-success bg-success',
            primary: 'text-primary bg-primary',
        };

        return (
            <span
                className={`${colors[color]} bg-opacity-15 h-12 min-h-12 rounded-lg inline-flex items-center justify-center font-bold leading-4 px-4 ${className}`}
                ref={ref}
                {...other}
            >
                {children}
            </span>
        );
    },
);

export default ButtonLoading;
