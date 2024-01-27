import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps extends PropsWithChildren {
    links: { text: string; path: string }[];
    pageName: string;
}

const Breadcrumb = ({ links, pageName }: BreadcrumbProps) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    {links.map(({ text, path }) => (
                        <>
                            <li>
                                <Link to={path}>{text}</Link>
                            </li>
                            {'/'}
                        </>
                    ))}
                    <li className="text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
