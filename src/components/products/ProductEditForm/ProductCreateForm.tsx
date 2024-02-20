import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import Select from '@/common/Select';
import TextArea from '@/common/TextArea';
import { Category } from '@/types';
import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ButtonLoading from '@/common/Loaders/ButtonLoading';
import { Product } from '@/types/Product';
import useCreateProduct from '@/hooks/mutations/useCreateProduct';
import useCategories from '@/hooks/queries/categories/useCategories';
import CategoriesSelect from './CategoriesSelect';

interface Props extends PropsWithChildren {}

export default function ProductCreateForm({}: Props) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<Product>();

    const { isPending, mutate } = useCreateProduct(setError);

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
                    <CategoriesSelect
                        {...register('category_id')}
                        disabled={isPending}
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
