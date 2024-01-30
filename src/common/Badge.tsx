import { HTMLAttributes } from 'react';

const colorsTw = {
    success: 'border-teal-200 bg-teal-100 text-teal-800',
    info: 'border-blue-200 bg-blue-100 text-blue-800',
    warning: 'border-yellow-200 bg-yellow-100 text-yellow-800',
    danger: 'border-red-200 bg-red-100 text-red-800',
};

interface Props extends HTMLAttributes<HTMLSpanElement> {
    color?: keyof typeof colorsTw;
}

export default function Badge({
    color = 'success',
    className,
    children,
    ...rest
}: Props) {
    return (
        <span
            className={`inline-flex items-center justify-center px-3 py-1 text-[14px] rounded-full border ${colorsTw[color]} ${className}`}
            {...rest}
        >
            {children}
        </span>
    );
}
