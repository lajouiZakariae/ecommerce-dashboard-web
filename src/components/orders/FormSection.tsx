import { Disclosure, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

type Props = PropsWithChildren<{ title: string }>;

export default function FormSection({ title, children }: Props) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        ref.current?.click();
        console.log(ref.current);
    }, []);

    return (
        <Disclosure as="div" className="space-y-3 mb-3">
            {({ open }) => (
                <>
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-700 dark:text-slate-100">
                            {title}
                        </h3>
                        <Disclosure.Button
                            as="button"
                            ref={ref}
                            type="button"
                            className={`flex items-center justify-center mr-3 hover:bg-gray-100 dark:hover:bg-form-input rounded-full size-7 transition duration-300 ${open ? '-rotate-90' : ''}`}
                        >
                            <FaChevronDown className="size-4 text-gray-700 dark:text-slate-100" />
                        </Disclosure.Button>
                    </div>

                    <hr />

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Disclosure.Panel>{children}</Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}
