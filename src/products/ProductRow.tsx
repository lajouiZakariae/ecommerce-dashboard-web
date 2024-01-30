import { GoKebabHorizontal as MenuIcon } from 'react-icons/go';
import { Product } from '@/types';
import { PropsWithChildren, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { animated, useSpring } from '@react-spring/web';
import Button from '@/common/Button';
import DeleteResource from '@/common/DeleteResource';
import TogglePublish from './TogglePublish';
import { Link } from 'react-router-dom';
import Badge from '@/common/Badge';
import OptionItem from './OptionItem';

// function Badge({
//     variant,
//     children,
// }: PropsWithChildren<{ variant: 'error' | 'success' }>) {
//     const badgeClass = {
//         error: 'badge-error',
//         success: 'badge-success',
//     };

//     return (
//         <div className={`badge ${badgeClass[variant]} py-3 px-3 text-white`}>
//             {children}
//         </div>
//     );
// }

export default function ProductRow({
    id,
    title,
    cost,
    price,
    stock_quantity,
    published,
    url,
    thumbnail,
}: PropsWithChildren<Product>) {
    return (
        <tr key={id}>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-15 h-15">
                            <img
                                src={thumbnail?.url ?? '/placeholder.jpg'}
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold dark:font-normal">{title}</div>
            </td>
            <td>{price}</td>
            <td>{cost}</td>
            <td>{stock_quantity}</td>
            <td>
                <Badge
                    color={published ? 'success' : 'danger'}
                    className="min-w-28"
                >
                    {published ? 'published' : 'unpublished'}
                </Badge>
            </td>
            <td className="p-0">
                <OptionsDropDown>
                    <li>
                        <Link to={`/products/${id}/edit`}>
                            <OptionItem>Edit</OptionItem>
                        </Link>
                    </li>

                    <li>
                        <TogglePublish
                            id={id}
                            url={url}
                            published={published}
                        />
                    </li>

                    <li>
                        <DeleteResource
                            url={url}
                            queryKey={['products']}
                            pendingTxt="deleting..."
                        >
                            Delete
                        </DeleteResource>
                    </li>
                </OptionsDropDown>
            </td>
        </tr>
    );
}

function OptionsDropDown({ children }: PropsWithChildren) {
    const [show, setShow] = useState(true);

    const springs = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

    return (
        <div className="dropdown dropdown-end">
            <button
                role="button"
                className="m-1"
                onClick={() => setShow((prev) => !prev)}
            >
                <MenuIcon className="text-2xl rotate-90 text- dark:text-bodydark" />
            </button>

            {show && (
                <ClickAwayListener onClickAway={() => setShow(false)}>
                    <animated.ul
                        className="absolute p-2 bg-white dark:bg-boxdark right-0 top-full z-999 w-36 rounded-box py-2 flex flex-col shadow-1 space-y-2"
                        style={{ ...springs }}
                    >
                        {children}
                    </animated.ul>
                </ClickAwayListener>
            )}
        </div>
    );
}
