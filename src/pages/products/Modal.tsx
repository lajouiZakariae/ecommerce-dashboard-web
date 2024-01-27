import { PropsWithChildren } from 'react';
import { IoAdd } from 'react-icons/io5';

function Box({ children }: PropsWithChildren) {
    return (
        <div className="text-center bg-slate-200 cursor-pointer h-25 w-25 flex items-center justify-center rounded hover:bg-slate-300 transition-colors duration-300">
            {children}
        </div>
    );
}

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
    return (
        <>
            <FAB>
                <IoAdd />
            </FAB>

            <dialog id="createModal" className="modal">
                <div className="modal-box">
                    <div className="flex space-x-3">
                        <Box>Product</Box>
                        <Box>Payment Method</Box>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
