import usePage from '@/hooks/usePage';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ links: [] }>;

export default function ProductsPagination({ links }: Props) {
    const { setPage } = usePage();

    return (
        <div className="join">
            {links.map(({ label, active }) => (
                <button
                    key={label}
                    className={`join-item btn ${active ? 'btn-primary' : ''}`}
                    onClick={() => setPage(parseInt(label))}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
