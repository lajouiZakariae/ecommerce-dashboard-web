import { PropsWithChildren, useMemo, useState } from 'react';

interface Props extends PropsWithChildren {
    page: number;
    count: number;
    pageChange: (page: number) => void;
}

export default function Pagination({ page, count }: Props) {
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

    console.log(surrondedLinks);

    return <div></div>;
}
