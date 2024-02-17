import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import Select from '@/common/Select';
import TextArea from '@/common/TextArea';
import { Category } from '@/types';
import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ButtonLoading from '@/common/Loaders/ButtonLoading';
import { Client } from './types/Client';
import useUpdateClient from '@/hooks/mutations/useUpdateClient';

interface Props extends PropsWithChildren {
    client: Client;
}

export default function ClientEditForm({ client }: Props) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: client,
    });

    const { isPending, mutate } = useUpdateClient(client.id, setError);

    const submitHandler: SubmitHandler<Client> = (data) => {
        clearErrors();
        mutate(data);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="p-6.5" onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <FormGroup
                        className="w-full xl:w-1/2"
                        labelText="First Name"
                        errorMessage={errors?.root?.first_name?.message}
                    >
                        <Input
                            id="firstName"
                            className="mb-2.5"
                            {...register('first_name')}
                            disabled={isPending}
                            error={Boolean(errors?.root?.first_name?.message)}
                        />
                    </FormGroup>

                    <FormGroup
                        className="w-full xl:w-1/2"
                        labelText="Last Name"
                        errorMessage={errors?.root?.last_name?.message}
                    >
                        <Input
                            id="lastName"
                            className="mb-2.5"
                            {...register('last_name')}
                            disabled={isPending}
                            error={Boolean(errors?.root?.last_name?.message)}
                        />
                    </FormGroup>
                </div>

                <FormGroup
                    className="mb-4"
                    labelText="Email"
                    errorMessage={errors?.root?.email?.message}
                >
                    <Input
                        id="email"
                        className="mb-2.5"
                        {...register('email')}
                        disabled={isPending}
                        error={Boolean(errors?.root?.email?.message)}
                    />
                </FormGroup>

                {/* <FormGroup className="mb-4.5" labelText="Category">
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
                </FormGroup> */}

                {isPending ? (
                    <ButtonLoading purpose="success" className="w-full">
                        Saving...
                    </ButtonLoading>
                ) : (
                    <button className="btn btn-success text-white w-full">
                        Save Client
                    </button>
                )}
            </form>
        </div>
    );
}
