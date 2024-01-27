import CreateProductForm from '@/products/CreateProductForm';
import { HTMLAttributes, PropsWithChildren, forwardRef, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { FaChevronLeft } from 'react-icons/fa6';

const Box = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    function ({ children, ...other }, ref) {
        return (
            <div
                className="text-center bg-slate-200 dark:bg-boxdark hover:dark:bg-opacity-70 hover:bg-slate-300 cursor-pointer h-25 w-25 flex items-center justify-center rounded  transition-colors duration-300"
                ref={ref}
                {...other}
            >
                {children}
            </div>
        );
    },
);

function FAB({ children }: PropsWithChildren) {
    return (
        <div className="fixed bottom-6 right-6 p-4">
            <button
                onClick={() =>
                    document.getElementById('createModal')!.showModal()
                }
                className="bg-boxdark text-white rounded-full w-12 h-12 flex items-center justify-center text-4xl"
            >
                {children}
            </button>
        </div>
    );
}

export default function Modal() {
    type step = 'choose' | 'form' | 'done';
    type itemType = 'product' | null;

    const [step, setStep] = useState<step>('choose');
    const [item, setItem] = useState<itemType>(null);

    return (
        <>
            <FAB>
                <IoAdd />
            </FAB>

            <dialog id="createModal" className="modal">
                <div className="modal-box min-h-65">
                    {step === 'choose' ? (
                        <div className="flex space-x-3">
                            <Box
                                onClick={() => {
                                    setStep('form');
                                    setItem('product');
                                }}
                            >
                                Product
                            </Box>
                            <Box>Payment Method</Box>
                        </div>
                    ) : null}

                    {step === 'form' ? (
                        <>
                            <button
                                className="btn btn-sm btn-circle mb-2"
                                onClick={() => {
                                    setItem(null);
                                    setStep('choose');
                                }}
                            >
                                <FaChevronLeft />
                            </button>

                            <CreateProductForm />
                        </>
                    ) : null}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
