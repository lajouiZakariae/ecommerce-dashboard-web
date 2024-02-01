import { TableHTMLAttributes } from 'react';
import Table from '../Table';

interface Props extends TableHTMLAttributes<HTMLTableElement> {
    count: number;
    headers: { name: string }[];
}

export default function TableLoading({ count, headers, ...other }: Props) {
    return (
        <Table headers={headers} {...other}>
            {[...Array(count).keys()].map((index) => (
                <tr key={index}>
                    <td colSpan={7}>
                        <div className="skeleton h-6"></div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
