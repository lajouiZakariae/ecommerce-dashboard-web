import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ headers: { name: string }[] }>;

export default function Table({ headers, children }: Props) {
    return (
        <table className="table bg-white dark:bg-transparent">
            <thead>
                <tr>
                    <th>
                        <label>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                            />
                        </label>
                    </th>
                    {headers.map(({ name }) => (
                        <th key={name}>{name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
            <tfoot>
                <tr>
                    <th></th>
                    {headers.map(({ name }) => (
                        <th key={name}>{name}</th>
                    ))}
                    <th></th>
                </tr>
            </tfoot>
        </table>
    );
}
