import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { Order } from './types/order';
import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import FormSection from './FormSection';

interface Props extends PropsWithChildren {
    order: Order;
}

export default function OrderEditForm({ order }: Props) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: order,
    });

    // const { isPending, mutate } = useUpdateProduct(product.id, setError);

    // const submitHandler: SubmitHandler<Product> = (data) => {
    //     clearErrors();
    //     mutate(data);
    // };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="p-6.5">
                <FormSection title="Customer Information">
                    <FormGroup
                        className="mb-4"
                        labelText="Full Name"
                        // errorMessage={errors?.root?.title?.message}
                    >
                        <Input
                            id="full_name"
                            className="mb-2.5"
                            variant="sm"
                            {...register('full_name')}
                            // disabled={isPending}
                        />
                    </FormGroup>

                    <FormGroup
                        className="mb-4"
                        labelText="Email"
                        // errorMessage={errors?.root?.title?.message}
                    >
                        <Input
                            id="email"
                            className="mb-2.5"
                            variant="sm"
                            {...register('email')}
                            // disabled={isPending}
                        />
                    </FormGroup>

                    <FormGroup
                        className="mb-4"
                        labelText="Phone Number"
                        // errorMessage={errors?.root?.title?.message}
                    >
                        <Input
                            id="phone_number"
                            className="mb-2.5"
                            variant="sm"
                            {...register('phone_number')}
                            // disabled={isPending}
                        />
                    </FormGroup>
                </FormSection>

                <FormSection title="Shipping Details">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <FormGroup
                            className="w-full xl:w-1/2"
                            labelText="City"
                            errorMessage={errors?.root?.price?.message}
                        >
                            <Input
                                id="city"
                                className="mb-2.5"
                                {...register('city')}
                                // disabled={isPending}
                                // error={Boolean(errors?.root?.price?.message)}
                            />
                        </FormGroup>

                        <FormGroup
                            className="w-full xl:w-1/2"
                            labelText="Zip Code"
                            errorMessage={errors?.root?.cost?.message}
                        >
                            <Input
                                id="zip_code"
                                className="mb-2.5"
                                {...register('zip_code')}
                                // disabled={isPending}
                                // error={Boolean(errors?.root?.cost?.message)}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup
                        className="mb-4"
                        labelText="Address"
                        // errorMessage={errors?.root?.title?.message}
                    >
                        <Input
                            id="address"
                            className="mb-2.5"
                            variant="sm"
                            {...register('address')}
                            // disabled={isPending}
                        />
                    </FormGroup>
                </FormSection>

                {/* <FormSection title="Ordered Prodcuts"></FormSection> */}

                {/* {isPending ? (
                    <ButtonLoading purpose="success" className="w-full">
                        Saving...
                    </ButtonLoading>
                ) : ( */}
                <button className="btn btn-success text-white w-full">
                    Save Order
                </button>
                {/* )} */}
            </form>
        </div>
    );
}
