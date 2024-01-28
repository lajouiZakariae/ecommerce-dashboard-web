import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'sm' | 'md';
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = 'md', error = false, ...other }, ref) => {
        const sizes = {
            sm: 'py-2',
            md: 'py-3',
        };

        return (
            <input
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent ${sizes[variant]} px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${error ? 'border-danger' : ''} ${className}`}
                ref={ref}
                {...other}
            />
        );
    },
);

export default Input;
