import Pagination from '@/common/Pagination';
import useProducts from '@/hooks/queries/products/useProducts';
import usePage from '@/hooks/usePage';
import { BsX } from 'react-icons/bs';

export default function ProductsListing() {
    const { page, setPage } = usePage();

    const { data, isError, isLoading, isSuccess } = useProducts({ page });

    const renderPagination = () => {
        if (isError) return;

        if (isLoading) return 'Loading...';

        if (isSuccess)
            return (
                <Pagination
                    page={page}
                    count={data.meta.last_page}
                    pageChangeHandler={(_page) => setPage(_page)}
                />
            );
    };

    return (
        <dialog id="previewOrderItemsModal" className="modal">
            <div className="modal-box max-w-3xl min-h-65">
                <div className="flex justify-end">
                    <button
                        className="size-8 rounded-full flex  items-center justify-center transition-colors duration-300 hover:bg-slate-800 cursor-pointer"
                        onClick={() =>
                            document
                                .querySelector('#previewOrderItemsModal')!
                                // @ts-ignore
                                .close()
                        }
                    >
                        <BsX className="size-7" />
                    </button>
                </div>

                <div className="flex flex-wrap items-stretch">
                    {data?.data.map(({ id, thumbnail, title, price }) => (
                        <div key={id} className="basis-1/2 p-2">
                            <div
                                className={`flex flex-wrap p-4 bg-slate-50 dark:bg-black  shadow-1 h-full border ${'dark:border-slate-800'}`}
                            >
                                <img
                                    src={thumbnail?.url ?? '/placeholder.jpg'}
                                    alt={thumbnail?.alt_text}
                                    className="size-15 object-cover rounded-md"
                                />

                                <div className="ml-5 flex-1">
                                    <h4 className="font-bold">{title}</h4>
                                    <p className="text-sm">
                                        Price: {price} MAD
                                    </p>
                                </div>

                                {/* <div
                                    className={`basis-full flex ${isEdit ? 'justify-between' : 'justify-end'} items-center mt-2`}
                                >
                                    <>
                                        {isEdit && (
                                            <div className="flex items-stretch">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm rounded-none p-2"
                                                    disabled={quantity <= 1}
                                                    onClick={() =>
                                                        setOrderItem(
                                                            (prev) => ({
                                                                ...prev,
                                                                quantity:
                                                                    prev.quantity -
                                                                    1,
                                                            }),
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="number"
                                                    className="w-18 text-center"
                                                    value={quantity}
                                                    onChange={(ev) =>
                                                        setOrderItem(
                                                            (prev) => ({
                                                                ...prev,
                                                                quantity:
                                                                    parseInt(
                                                                        ev
                                                                            .target
                                                                            .value,
                                                                    ),
                                                            }),
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-sm rounded-none p-2"
                                                    onClick={() =>
                                                        setOrderItem(
                                                            (prev) => ({
                                                                ...prev,
                                                                quantity:
                                                                    prev.quantity +
                                                                    1,
                                                            }),
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}

                                        <div>
                                            {isEdit ? (
                                                <button
                                                    className="btn btn-sm btn-outline btn-success rounded-none"
                                                    onClick={updateHandler}
                                                >
                                                    {updateMutation.isPending
                                                        ? 'Saving...'
                                                        : 'Save'}
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline btn-info rounded-none"
                                                    onClick={() =>
                                                        setIsEdit(true)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            <button
                                                className="ml-4 btn btn-sm btn-outline btn-error rounded-none"
                                                onClick={deleteHandler}
                                            >
                                                {deleteMutation.isPending
                                                    ? 'Deleting...'
                                                    : 'Delete'}
                                            </button>
                                        </div>
                                    </>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">{renderPagination()}</div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
