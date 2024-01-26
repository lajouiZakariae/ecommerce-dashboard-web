import { FormEvent, useState } from 'react';
import { IoClose as CloseIcon } from 'react-icons/io5';
import useFilters from './useFilters';
import Button from '@/common/Button';

export default function ProductsFilter() {
    const { filters, setFilters, clearFilters, applyFilters } = useFilters();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    const submitHandler = (ev: FormEvent<HTMLElement>) => {
        ev.preventDefault();
        applyFilters();
        toggleOpen();
    };

    return (
        <div className="flex justify-end">
            <Button variant="primary" onClick={() => setOpen((prev) => !prev)}>
                Filters
            </Button>
            {open ? (
                <div className="fixed bottom-0 left-0 p-4 min-h-100 w-full border-none rounded-t-3xl bg-white">
                    <div className="flex justify-end">
                        <button
                            className="btn btn-sm btn-circle"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon className="text-2xl text-graydark" />
                        </button>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-boxdark">
                            Sort By
                        </h3>
                        <div className="flex">
                            <div className="flex-grow btn rounded-none rounded-l">
                                Time
                            </div>
                            <div className="flex-grow btn rounded-none">
                                Price
                            </div>
                            <div className="flex-grow btn rounded-none">
                                Cost
                            </div>
                            <div className="flex-grow btn rounded-none rounded-r">
                                Stock Quanity
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
