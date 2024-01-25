import { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLElement> {
    variant: 'error' | 'info' | 'success' | 'warning';
}

export default function Alert({
    variant,
    children,
    className,
    ...other
}: AlertProps) {
    const variants = {
        info: 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500',
        success:
            'bg-teal-100 border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500',
        error: 'bg-red-100 border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500',
        warning:
            'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500',
    };

    return (
        <>
            <div
                className={`border text-left text-sm rounded-lg p-4 ${variants[variant]} ${className}`}
                role="alert"
                {...other}
            >
                {children}
            </div>
        </>
    );
}
