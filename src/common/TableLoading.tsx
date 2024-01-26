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
                        <div className="my-1 h-8 bg-[#e7e7e7] rounded-full dark:bg-gray animate-pulse"></div>
                    </td>
                </tr>
            ))}
        </Table>
    );
}
