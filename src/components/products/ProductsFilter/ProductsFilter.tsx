import { FormEvent, useState } from 'react';
import { IoClose as CloseIcon } from 'react-icons/io5';
import useFilters from './useFilters';
import Button from '@/common/Button';
import { SortBy } from '@/types';
import { useClickAway } from '@uidotdev/usehooks';

export default function ProductsFilter() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const clickAwayTarget = useClickAway(() => setIsOpen(false));

    const {
        filtersInputs,
        setFiltersInputs,
        appliedFiltersCount,
        clearFilters,
        applyFilters,
    } = useFilters();

    const submitHandler = (ev: FormEvent<HTMLElement>) => {
        ev.preventDefault();
        applyFilters();
        toggleOpen();
    };

    return (
        <div className="flex justify-end relative mb-2">
            <Button
                size="sm"
                type="button"
                purpose="primary"
                onClick={(ev) => {
                    ev.stopPropagation;
                    setIsOpen(true);
                }}
            >
                Filters{' '}
                {appliedFiltersCount > 0 ? `( ${appliedFiltersCount} )` : null}
            </Button>

            {isOpen ? (
                <div
                    // @ts-ignore
                    ref={clickAwayTarget}
                    className="fixed bottom-0 left-0 pb-4 max-h-100 overflow-y-auto w-full border-none rounded-t-3xl bg-white dark:bg-boxdark dark:text-bodydark shadow-[#ccc] dark:shadow-black shadow-3 sm:absolute sm:bottom-auto sm:top-10 sm:left-auto sm:right-0 sm:max-w-203 sm:rounded-lg z-999999"
                >
                    <div className="sticky top-0 left-0 w-full p-4 flex justify-between bg-white dark:bg-boxdark">
                        <Button
                            size="sm"
                            type="button"
                            purpose="primary"
                            onClick={() => {
                                clearFilters();
                                toggleOpen();
                            }}
                        >
                            Clear
                        </Button>
                        <button
                            type="button"
                            className="btn btn-sm btn-circle"
                            onClick={() => setIsOpen(false)}
                        >
                            <CloseIcon className="text-2xl text-graydark" />
                        </button>
                    </div>
                    <form className="mx-4" onSubmit={submitHandler}>
                        <div className="flex flex-col space-y-4 mb-4 sm:flex-row sm:flex-wrap">
                            <div className="flex flex-col space-y-2 sm:basis-full">
                                <h3 className="text-lg font-bold text-boxdark dark:text-bodydark1">
                                    Sort By
                                </h3>

                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5">
                                    <div className="flex grow">
                                        <button
                                            type="button"
                                            className={`grow btn rounded-none rounded-l ${filtersInputs.sort_by === SortBy.CREATED_AT ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
                                                    ...prev,
                                                    sort_by: SortBy.CREATED_AT,
                                                }))
                                            }
                                        >
                                            Time
                                        </button>
                                        <button
                                            type="button"
                                            className={`grow btn rounded-none ${filtersInputs.sort_by === SortBy.PRICE ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
                                                    ...prev,
                                                    sort_by: SortBy.PRICE,
                                                }))
                                            }
                                        >
                                            Price
                                        </button>
                                        <button
                                            type="button"
                                            className={`grow btn rounded-none ${filtersInputs.sort_by === SortBy.COST ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
                                                    ...prev,
                                                    sort_by: SortBy.COST,
                                                }))
                                            }
                                        >
                                            Cost
                                        </button>
                                        <button
                                            type="button"
                                            className={`grow btn rounded-none rounded-r ${filtersInputs.sort_by === SortBy.STOCK_QUANTITY ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
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
                                            className={`grow btn rounded-none rounded-l ${filtersInputs.order === 'asc' ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
                                                    ...prev,
                                                    order: 'asc',
                                                }))
                                            }
                                        >
                                            Low to High
                                        </button>
                                        <button
                                            type="button"
                                            className={`grow btn rounded-none rounded-r ${filtersInputs.order === 'desc' ? 'btn-primary' : ''}`}
                                            onClick={() =>
                                                setFiltersInputs((prev) => ({
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
                                <h3 className="text-lg font-bold text-boxdark dark:text-bodydark1">
                                    Price Range
                                </h3>

                                <div className="flex justify-between items-center gap-3">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="0.00"
                                        value={filtersInputs.price_from}
                                        onChange={(ev) =>
                                            setFiltersInputs((prev) => ({
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
                                        value={filtersInputs.price_to}
                                        onChange={(ev) =>
                                            setFiltersInputs((prev) => ({
                                                ...prev,
                                                price_to: ev.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2 sm:basis-1/2 sm:pl-2">
                                <h3 className="text-lg font-bold text-boxdark dark:text-bodydark1">
                                    Cost Range
                                </h3>

                                <div className="flex justify-between items-center gap-3">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="0.00"
                                        value={filtersInputs.cost_from}
                                        onChange={(ev) =>
                                            setFiltersInputs((prev) => ({
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
                                        value={filtersInputs.cost_to}
                                        onChange={(ev) =>
                                            setFiltersInputs((prev) => ({
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
            ) : null}
        </div>
    );
}
