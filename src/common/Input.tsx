import { InputHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, ButtonProps>(
    ({ className, error = false, ...other }, ref) => {
        return (
            <input
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${error ? 'border-danger' : ''} ${className}`}
                ref={ref}
                {...other}
            />
        );
    },
);

export default Input;
