import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';

export default function usePage(): { page: number; setPage: Function } {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') ?? '1');

    const setPage = (_page: number) =>
        setSearchParams((prev: URLSearchParams) =>
            appendSearchParams(prev, { page: _page }),
        );

    return { page, setPage };
}
