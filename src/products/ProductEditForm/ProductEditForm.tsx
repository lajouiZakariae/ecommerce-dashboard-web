import Input from '@/common/Input';
import Select from '@/common/Select';
import TextArea from '@/common/TextArea';
import { Category, Product } from '@/types';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

interface Props extends PropsWithChildren {
    product: Product;
    categories: Category[];
}

export default function ProductEditForm({ product, categories }: Props) {
    const { register } = useForm({ defaultValues: product });

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#" className="p-6.5">
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
                        />

                        <p className="h-3.5 text-[14px] text-danger"></p>
                    </div>
                </div>

                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Subject
                    </label>

                    <Select
                        options={categories}
                        renderItem={({ id, name }: Category) => (
                            <option value={id}>{name}</option>
                        )}
                        {...register('categoryId')}
                    />
                </div>

                <input
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    value="Save Product"
                />
            </form>
        </div>
    );
}
