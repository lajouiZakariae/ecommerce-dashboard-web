import { HTMLAttributes } from 'react';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
    labelText: string;
    errorMessage: string | undefined;
}

export default function FormGroup({
    children,
    labelText,
    errorMessage,
    ...other
}: FormGroupProps) {
    return (
        <div {...other}>
            <label className="mb-2.5 inline-block text-black dark:text-white">
                {labelText}
            </label>

            {children}

            <p className="h-3.5 text-[14px] text-danger dark:text-red-400">
                {errorMessage}
            </p>
        </div>
    );
}
