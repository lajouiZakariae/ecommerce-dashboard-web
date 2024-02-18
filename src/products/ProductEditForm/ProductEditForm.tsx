import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import Select from '@/common/Select';
import TextArea from '@/common/TextArea';
import useUpdateProduct from '@/hooks/mutations/useUpdateProduct';
import { Category } from '@/types';
import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ButtonLoading from '@/common/Loaders/ButtonLoading';
import { Product } from '../types/Product';

interface Props extends PropsWithChildren {
    product: Product;
    categories: Category[];
}

export default function ProductEditForm({ product, categories }: Props) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: product,
    });

    const { isPending, mutate } = useUpdateProduct(product.id, setError);

    const submitHandler: SubmitHandler<Product> = (data) => {
        clearErrors();
        mutate(data);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="p-6.5" onSubmit={handleSubmit(submitHandler)}>
                <FormGroup
                    className="mb-4"
                    labelText="Title"
                    errorMessage={errors?.root?.title?.message}
                >
                    <Input
                        id="title"
                        className="mb-2.5"
                        {...register('title')}
                        disabled={isPending}
                    />
                </FormGroup>

                <FormGroup
                    className="mb-4"
                    labelText="Description"
                    errorMessage={errors?.root?.description?.message}
                >
                    <TextArea
                        rows={6}
                        placeholder="Describe your product"
                        {...register('description')}
                        disabled={isPending}
                        error={Boolean(errors?.root?.description?.message)}
                    ></TextArea>
                </FormGroup>

                <FormGroup
                    className="mb-4"
                    labelText="Stock Quantity"
                    errorMessage={errors?.root?.stock_quantity?.message}
                >
                    <Input
                        id="title"
                        className="mb-2.5"
                        {...register('stock_quantity')}
                        disabled={isPending}
                        error={Boolean(errors?.root?.stock_quantity?.message)}
                    />
                </FormGroup>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <FormGroup
                        className="w-full xl:w-1/2"
                        labelText="Price"
                        errorMessage={errors?.root?.price?.message}
                    >
                        <Input
                            id="title"
                            className="mb-2.5"
                            {...register('price')}
                            disabled={isPending}
                            error={Boolean(errors?.root?.price?.message)}
                        />
                    </FormGroup>

                    <FormGroup
                        className="w-full xl:w-1/2"
                        labelText="Cost"
                        errorMessage={errors?.root?.cost?.message}
                    >
                        <Input
                            id="title"
                            className="mb-2.5"
                            {...register('cost')}
                            disabled={isPending}
                            error={Boolean(errors?.root?.cost?.message)}
                        />
                    </FormGroup>
                </div>

                <FormGroup className="mb-4.5" labelText="Category">
                    <Select
                        {...register('category_id')}
                        options={categories}
                        disabled={isPending}
                        renderItem={({ id, name }: Category) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        )}
                    />
                </FormGroup>

                {isPending ? (
                    <ButtonLoading purpose="success" className="w-full">
                        Saving...
                    </ButtonLoading>
                ) : (
                    <button className="btn btn-success text-white w-full">
                        Save Product
                    </button>
                )}
            </form>
        </div>
    );
}
