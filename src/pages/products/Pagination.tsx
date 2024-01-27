import { PropsWithChildren, useMemo } from 'react';

interface Props extends PropsWithChildren {
    page: number;
    count: number;
    pageChangeHandler: (page: number) => void;
}

export default function Pagination({ page, count, pageChangeHandler }: Props) {
    const surrondedLinks = useMemo(() => {
        const links = [];

        let start = 1;
        let finish = 5;

        if (count <= 5) {
            finish = count;
        } else {
            if (page <= 2) {
                // page at the begining
                start = 1;
                finish = 5;
            } else if (page >= count - 1) {
                // page at the end
                start = count - 4;
                finish = count;
            } else {
                start = page - 2;
                finish = page + 2;
            }
        }

        for (let i = start; i <= finish; i++) links.push(i);

        return links;
    }, [page, count]);

    return (
        <div className="flex space-x-4">
            <button className="btn">Previous</button>
            <div className="join">
                {surrondedLinks.map((_page) => (
                    <button
                        key={_page}
                        className={`join-item btn ${page === _page ? 'btn-primary' : ''}`}
                        onClick={() => pageChangeHandler(_page)}
                    >
                        {_page}
                    </button>
                ))}
            </div>
            <button className="btn">Next</button>
        </div>
    );
}
