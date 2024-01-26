import { FormEvent, useState } from 'react';
import { IoClose as CloseIcon } from 'react-icons/io5';
import useFilters from './useFilters';
import Button from '@/common/Button';
import { sortBy } from '@/types';

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

                    <div className="flex flex-col space-y-2 mb-2">
                        <h3 className="text-lg font-bold text-boxdark">
                            Sort By
                        </h3>
                        <div className="flex">
                            <button
                                className={`grow btn rounded-none rounded-l ${filters.sort_by === sortBy.TIME ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sort_by: sortBy.TIME,
                                    }))
                                }
                            >
                                Time
                            </button>
                            <button
                                className={`grow btn rounded-none ${filters.sort_by === sortBy.PRICE ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sort_by: sortBy.PRICE,
                                    }))
                                }
                            >
                                Price
                            </button>
                            <button
                                className={`grow btn rounded-none ${filters.sort_by === sortBy.COST ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sort_by: sortBy.COST,
                                    }))
                                }
                            >
                                Cost
                            </button>
                            <button
                                className={`grow btn rounded-none rounded-r ${filters.sort_by === sortBy.STOCK_QUANTITY ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sort_by: sortBy.STOCK_QUANTITY,
                                    }))
                                }
                            >
                                Stock Quanity
                            </button>
                        </div>
                        <div className="flex">
                            <button
                                className={`grow btn rounded-none rounded-l ${filters.order === 'asc' ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        order: 'asc',
                                    }))
                                }
                            >
                                Low to High
                            </button>
                            <button
                                className={`grow btn rounded-none rounded-r ${filters.order === 'desc' ? 'btn-primary' : ''}`}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        order: 'desc',
                                    }))
                                }
                            >
                                High to Low
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 mb-2">
                        <h3 className="text-lg font-bold text-boxdark">
                            Price Range
                        </h3>

                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                            />
                            <span className="text-lg grow">To</span>
                            <input
                                type="text"
                                className="input input-bordered input-sm grow"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
