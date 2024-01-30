import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function OptionItem({ className, children, ...rest }: Props) {
    return (
        <button
            className={`btn btn-block shadow-none min-h-10 h-10 bg-transparent border-none ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}
