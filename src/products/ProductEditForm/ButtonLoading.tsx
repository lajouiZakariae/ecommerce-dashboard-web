import { ButtonHTMLAttributes, forwardRef } from 'react';

const ButtonLoading = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLElement>
>(() => {
    return (
        <p className="text-success bg-success bg-opacity-15 min-h-12 rounded-lg inline-flex items-center justify-center w-full font-bold">
            Saving...
        </p>
    );
});

export default ButtonLoading;
