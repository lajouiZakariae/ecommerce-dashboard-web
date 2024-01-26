import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, error = false, ...other }, ref) => {
        return (
            <textarea
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${error ? 'border-danger' : ''} ${className}`}
                ref={ref}
                {...other}
            />
        );
    },
);

export default TextArea;
