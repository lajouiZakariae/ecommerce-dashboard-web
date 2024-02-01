import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { omitBy } from 'lodash';

import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import ButtonLoading from '@/common/Loaders/ButtonLoading';
import TextArea from '@/common/TextArea';
import useUpdatePaymentMethod from '@/hooks/mutations/useUpdatePaymentMethod';
import { PaymentMethod } from '@/types';

interface Props extends PropsWithChildren {
    paymentMethod: PaymentMethod;
}

export default function PaymentMethodEditForm({ paymentMethod }: Props) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: paymentMethod,
    });

    const { isPending, mutate } = useUpdatePaymentMethod(
        paymentMethod.id,
        setError,
    );

    const submitHandler: SubmitHandler<PaymentMethod> = (data) => {
        clearErrors();
        mutate(omitBy(data, (v) => v === null || v === undefined));
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
                        id="name"
                        className="mb-2.5"
                        {...register('name')}
                        disabled={isPending}
                    />
                </FormGroup>

                <FormGroup
                    className="mb-4"
                    labelText="Description"
                    errorMessage={errors?.root?.description?.message}
                >
                    <TextArea
                        id="decription"
                        className="mb-2.5"
                        {...register('description')}
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
