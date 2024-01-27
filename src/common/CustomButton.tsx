import { ButtonHTMLAttributes, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary';
    size?: 'sm';
    variant?: 'outline' | 'loading';
}

const CustomButton = forwardRef<HTMLButtonElement, Props>(
    (
        {
            color = 'primary',
            size = 'sm',
            variant,
            children,
            className,
            ...other
        },
        ref,
    ) => {
        const colors = {
            primary: 'btn-primary',
        };

        const variants = {
            outline: 'btn-outline',
            loading: 'outline-none text',
        };

        const sizes = {
            sm: 'btn-md',
        };

        return (
            <button
                className={`btn ${sizes[size]} ${variant ? variants[variant] : ''} ${className}`}
                ref={ref}
                {...other}
            >
                {children}
            </button>
        );
    },
);

export default CustomButton;
