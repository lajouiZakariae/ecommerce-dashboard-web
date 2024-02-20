import { ChangeEvent, MouseEvent, PropsWithChildren, useState } from 'react';
import { PaymentMethod } from '@/types';
import Input from '@/common/Input';
import useUpdatePaymentMethod from '@/hooks/mutations/useUpdatePaymentMethod';
import { omitBy } from 'lodash';
import DeleteResource from '@/common/DeleteResource';
import { Link } from 'react-router-dom';
import DropdownButton from '@/components/products/DropdownButton';
import DropdownDefault from '@/components/DropdownDefault';
import { FaEdit } from 'react-icons/fa';

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
                <DropdownDefault>
                    <Link to={`/payment-methods/${id}/edit`}>
                        <DropdownButton>
                            <FaEdit />
                            Edit
                        </DropdownButton>
                    </Link>

                    <DeleteResource
                        url={url}
                        pendingTxt="Deleting..."
                        queryKey={['payment-methods']}
                    >
                        Delete
                    </DeleteResource>
                </DropdownDefault>
            </td>
        </tr>
    );
}
