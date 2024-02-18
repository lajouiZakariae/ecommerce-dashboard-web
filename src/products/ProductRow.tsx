import { PropsWithChildren } from 'react';
import { FaEdit } from 'react-icons/fa';

import DeleteResource from '@/common/DeleteResource';
import TogglePublish from './TogglePublish';
import Badge from '@/common/Badge';
import DropdownDefault from '@/components/DropdownDefault';
import DropdownButton from './DropdownButton';
import { Link } from 'react-router-dom';
import { Product } from './types/Product';

export default function ProductRow({
    id,
    title,
    cost,
    price,
    stock_quantity,
    published,
    url,
    thumbnail,
}: PropsWithChildren<Product>) {
    return (
        <tr key={id}>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-15 h-15">
                            <img
                                src={thumbnail?.url ?? '/placeholder.jpg'}
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold dark:font-normal">{title}</div>
            </td>
            <td>{price} MAD</td>
            <td>{cost} MAD</td>
            <td>{stock_quantity}</td>
            <td>
                <Badge
                    color={published ? 'success' : 'danger'}
                    className="min-w-28"
                >
                    {published ? 'published' : 'unpublished'}
                </Badge>
            </td>
            <td className="p-0">
                <DropdownDefault>
                    <TogglePublish id={id} url={url} published={published} />

                    <Link to={`/dashboard/products/${id}/edit`}>
                        <DropdownButton>
                            <FaEdit />
                            Edit
                        </DropdownButton>
                    </Link>

                    <DeleteResource
                        url={url}
                        pendingTxt="Deleting..."
                        queryKey={['products']}
                    >
                        Delete
                    </DeleteResource>
                </DropdownDefault>
            </td>
        </tr>
    );
}
