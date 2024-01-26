import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    count: number;
}

export default function FeedLoading({ count }: Props) {
    return (
        <div className="flex flex-wrap gap-y-4">
            {[...Array(count).keys()].map((index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 basis-full sm:basis-1/2 sm:px-2"
                >
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            ))}
        </div>
    );
}
