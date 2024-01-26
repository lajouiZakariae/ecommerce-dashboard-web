import { FormEvent, useState } from 'react';
import { IoClose as CloseIcon } from 'react-icons/io5';
import useFilters from './useFilters';
import Button from '@/common/Button';
import { SortBy } from '@/types';
import ClickAwayListener from 'react-click-away-listener';

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
        <div className="flex justify-end relative mb-2">
            <Button type="button" variant="primary" onClick={toggleOpen}>
                Filters
            </Button>
            {open ? (
                <ClickAwayListener onClickAway={toggleOpen}>
                    <div className="fixed bottom-0 left-0 px-4 pb-4 max-h-100 overflow-y-auto w-full border-none rounded-t-3xl bg-white shadow-[#ccc] shadow-3 sm:absolute sm:bottom-auto sm:top-10 sm:left-auto sm:right-0 sm:max-w-203 sm:rounded-lg sm:z-999">
                        <form onSubmit={submitHandler}>
                            <div className="sticky bg-white top-0 left-0 w-full pt-4 flex justify-between mb-4">
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => clearFilters()}
                                >
                                    Clear
                                </Button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-circle"
                                    onClick={() => setOpen(false)}
                                >
                                    <CloseIcon className="text-2xl text-graydark" />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-4 mb-4 sm:flex-row sm:flex-wrap">
                                <div className="flex flex-col space-y-2 sm:basis-full">
                                    <h3 className="text-lg font-bold text-boxdark">
                                        Sort By
                                    </h3>

                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5">
                                        <div className="flex grow">
                                            <button
                                                type="button"
                                                className={`grow btn rounded-none rounded-l ${filters.sort_by === SortBy.CREATED_AT ? 'btn-primary' : ''}`}
                                                onClick={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        sort_by:
                                                            SortBy.CREATED_AT,
                                                    }))
                                                }
                                            >
                                                Time
                                            </button>
                                            <button
                                                type="button"
                                                className={`grow btn rounded-none ${filters.sort_by === SortBy.PRICE ? 'btn-primary' : ''}`}
                                                onClick={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        sort_by: SortBy.PRICE,
                                                    }))
                                                }
                                            >
                                                Price
                                            </button>
                                            <button
                                                type="button"
                                                className={`grow btn rounded-none ${filters.sort_by === SortBy.COST ? 'btn-primary' : ''}`}
                                                onClick={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        sort_by: SortBy.COST,
                                                    }))
                                                }
                                            >
                                                Cost
                                            </button>
                                            <button
                                                type="button"
                                                className={`grow btn rounded-none rounded-r ${filters.sort_by === SortBy.STOCK_QUANTITY ? 'btn-primary' : ''}`}
                                                onClick={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        sort_by:
                                                            SortBy.STOCK_QUANTITY,
                                                    }))
                                                }
                                            >
                                                Stock Quanity
                                            </button>
                                        </div>
                                        <div className="flex grow">
                                            <button
                                                type="button"
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
                                                type="button"
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
                                </div>

                                <div className="flex flex-col space-y-2 sm:basis-1/2 sm:pr-2">
                                    <h3 className="text-lg font-bold text-boxdark">
                                        Price Range
                                    </h3>

                                    <div className="flex justify-between items-center gap-3">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder="0.00"
                                            value={filters.price_from}
                                            onChange={(ev) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    price_from: ev.target.value,
                                                }))
                                            }
                                        />
                                        <span className="text-lg">To</span>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder="0.00"
                                            value={filters.price_to}
                                            onChange={(ev) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    price_to: ev.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2 sm:basis-1/2 sm:pl-2">
                                    <h3 className="text-lg font-bold text-boxdark">
                                        Cost Range
                                    </h3>

                                    <div className="flex justify-between items-center gap-3">
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder="0.00"
                                            value={filters.cost_from}
                                            onChange={(ev) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    cost_from: ev.target.value,
                                                }))
                                            }
                                        />
                                        <span className="text-lg">To</span>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder="0.00"
                                            value={filters.cost_to}
                                            onChange={(ev) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    cost_to: ev.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    value="Apply Filters"
                                />
                            </div>
                        </form>
                    </div>
                </ClickAwayListener>
            ) : null}
        </div>
    );
}
