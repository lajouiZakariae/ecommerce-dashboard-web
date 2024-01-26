import Input from '@/common/Input';
import Select from '@/common/Select';
import TextArea from '@/common/TextArea';
import useUpdateProduct from '@/hooks/mutations/useUpdateProduct';
import { Category, Product } from '@/types';
import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props extends PropsWithChildren {
    product: Product;
    categories: Category[];
}

export default function ProductEditForm({ product, categories }: Props) {
    const { register, handleSubmit } = useForm({ defaultValues: product });

    const { isPending, mutate } = useUpdateProduct(product.id);

    const submitHandler: SubmitHandler<Product> = (data) => {
        mutate(data);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="p-6.5" onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4.5">
                    <label
                        className="mb-2.5 inline-block text-black dark:text-white"
                        htmlFor="title"
                    >
                        Title
                    </label>

                    <Input
                        id="title"
                        className="mb-2.5"
                        {...register('title')}
                        disabled={isPending}
                    />

                    <p className="h-3.5 text-[14px] text-danger"></p>
                </div>

                <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Description
                    </label>

                    <TextArea
                        rows={6}
                        placeholder="Describe your product"
                        {...register('description')}
                        disabled={isPending}
                    ></TextArea>

                    <p className="h-3.5 text-[14px] text-danger"></p>
                </div>

                <div className="mb-4.5">
                    <label
                        className="mb-2.5 inline-block text-black dark:text-white"
                        htmlFor="title"
                    >
                        Stock Quantity
                    </label>

                    <Input
                        id="title"
                        className="mb-2.5"
                        {...register('stockQuantity')}
                        disabled={isPending}
                    />

                    <p className="h-3.5 text-[14px] text-danger"></p>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label
                            className="mb-2.5 inline-block text-black dark:text-white"
                            htmlFor="title"
                        >
                            Price
                        </label>

                        <Input
                            id="title"
                            className="mb-2.5"
                            {...register('price')}
                            disabled={isPending}
                        />

                        <p className="h-3.5 text-[14px] text-danger"></p>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label
                            className="mb-2.5 inline-block text-black dark:text-white"
                            htmlFor="title"
                        >
                            Cost
                        </label>

                        <Input
                            id="title"
                            className="mb-2.5"
                            {...register('cost')}
                            disabled={isPending}
                        />

                        <p className="h-3.5 text-[14px] text-danger"></p>
                    </div>
                </div>

                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Subject
                    </label>

                    <Select
                        {...register('categoryId')}
                        options={categories}
                        renderItem={({ id, name }: Category) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        )}
                        disabled={isPending}
                    />
                </div>

                {isPending ? (
                    <p className="text-success bg-success bg-opacity-15 min-h-12 rounded-lg inline-flex items-center justify-center w-full font-bold">
                        Saving...
                    </p>
                ) : (
                    <button className="btn btn-success text-white w-full">
                        Save Product
                    </button>
                )}
            </form>
        </div>
    );
}
