import { TableHTMLAttributes } from 'react';

interface Props extends TableHTMLAttributes<HTMLTableElement> {
    headers: { name: string; colSpan?: number }[];
}

export default function Table({
    headers,
    className,
    children,
    ...other
}: Props) {
    return (
        <table
            className={`table bg-white dark:bg-transparent ${className}`}
            {...other}
        >
            <thead>
                <tr>
                    {headers.map(({ name, colSpan }) => (
                        <th key={name} colSpan={colSpan ?? 1}>
                            {name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
            <tfoot>
                <tr>
                    {headers.map(({ name }) => (
                        <th key={name}>{name}</th>
                    ))}
                </tr>
            </tfoot>
        </table>
    );
}
