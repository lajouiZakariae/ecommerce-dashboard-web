import CreateProductForm from '@/products/CreateProductForm';
import {
    HTMLAttributes,
    PropsWithChildren,
    forwardRef,
    useEffect,
    useState,
} from 'react';
import { IoAdd } from 'react-icons/io5';

const Box = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    function ({ children, ...other }, ref) {
        return (
            <div
                className="text-center bg-slate-200 cursor-pointer h-25 w-25 flex items-center justify-center rounded hover:bg-slate-300 transition-colors duration-300"
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
                {step === 'choose' ? (
                    <div className="modal-box">
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
                    </div>
                ) : null}

                {step === 'form' ? (
                    <div className="modal-box">
                        <CreateProductForm />
                    </div>
                ) : null}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
