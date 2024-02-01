import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    color?: 'secondary' | 'info' | 'success' | 'error' | 'warning';
}

function Alert({ color = 'info', children, ...rest }: Props) {
    const colorsTw = {
        secondary: 'bg-gray-100  border-gray-200 text-gray-800',
        info: 'border-blue-200 text-blue-800 bg-blue-100',
        success: 'bg-teal-100 border-teal-200 text-teal-800',
        error: 'bg-red-100 border-red-200 text-red-800',
        warning: 'bg-yellow-100 border-yellow-200 text-yellow-800',
    };

    return (
        <div
            className={`border text-sm rounded-lg p-4 ${colorsTw[color]}`}
            role="alert"
            {...rest}
        >
            {children}
        </div>
    );
}

export default Alert;
