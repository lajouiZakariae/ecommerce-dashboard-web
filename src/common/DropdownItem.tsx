import { PropsWithChildren } from 'react';
import { NavLink, To, useLocation } from 'react-router-dom';

type Props = PropsWithChildren<{ href: To }>;

export default function DropdownItem({ href, children }: Props) {
    const { pathname } = useLocation();
    return (
        <NavLink
            to={href}
            className={
                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                (pathname === href && '!text-white')
            }
        >
            {children}
        </NavLink>
    );
}
