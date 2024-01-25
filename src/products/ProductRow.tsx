import { Product } from '@/types';
import { PropsWithChildren } from 'react';

export default function ProductRow({ id, title }: PropsWithChildren<Product>) {
    return (
        <tr key={id}>
            <th>
                <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-15 h-15">
                            <img
                                src="/placeholder.jpg"
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{title}</div>
            </td>
            <td>Purple</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
}
