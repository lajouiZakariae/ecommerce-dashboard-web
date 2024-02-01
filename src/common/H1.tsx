import { PropsWithChildren } from 'react';

export default function H1({ children }: PropsWithChildren) {
    return <h1 className="font-bold text-3xl">{children}</h1>;
}
