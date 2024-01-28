import { ChangeEvent, MouseEvent, PropsWithChildren, useState } from 'react';
import { PaymentMethod } from '@/types';
import Input from '@/common/Input';
import useUpdatePaymentMethod from '@/hooks/mutations/useUpdatePaymentMethod';
import { omitBy } from 'lodash';
import DeleteResource from '@/common/DeleteResource';
import ButtonLoading from '@/products/ProductEditForm/ButtonLoading';

type Props = PropsWithChildren<PaymentMethod>;

export default function PaymentMethodRow({
    id,
    name,
    description,
    url,
}: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const [inputs, setInputs] = useState({ name, description });

    const onChangeHandler =
        (inputName: string) => (ev: ChangeEvent<HTMLInputElement>) =>
            setInputs((prev) => ({ ...prev, [inputName]: ev.target.value }));

    const { isPending, mutate } = useUpdatePaymentMethod(id, setIsEdit);

    const submitHandler = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();

        mutate({ ...omitBy(inputs, (v) => v === null) });
    };

    return (
        <tr>
            <td></td>
            <td>
                {isEdit ? (
                    <Input
                        variant="sm"
                        value={inputs.name}
                        onChange={onChangeHandler('name')}
                    />
                ) : (
                    name
                )}
            </td>
            <td colSpan={3}>{description}</td>
            <td className="flex space-x-2">
                <DeleteResource
                    url={url}
                    queryKey={['payment-methods']}
                    pendingTxt="deleting..."
                    size="sm"
                >
                    Delete
                </DeleteResource>

                {isEdit ? (
                    isPending ? (
                        <p className="btn btn-sm bg-success bg-opacity-15 text-success">
                            Saving...
                        </p>
                    ) : (
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={submitHandler}
                        >
                            Save
                        </button>
                    )
                ) : (
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
}
