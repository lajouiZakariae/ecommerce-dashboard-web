import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function DropdownButton({
    className,
    children,
    ...rest
}: Props) {
    return (
        <button
            className={`flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray-default dark:hover:bg-meta-4 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}
