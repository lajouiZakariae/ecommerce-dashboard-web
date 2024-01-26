import { PropsWithChildren } from 'react';
import Table from './Table';

interface Props extends PropsWithChildren {
    headers: { name: string }[];
}

export default function TableLoading({ headers }: Props) {
    return (
        <Table headers={headers}>
            {[...Array(10).keys()].map((index) => (
                <tr key={index}>
                    <td colSpan={8}>
                        <div className="skeleton my-1 h-8"></div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
