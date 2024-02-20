import { PropsWithChildren } from 'react';
import { Product } from '../../products/types/Product';

type Props = PropsWithChildren<{
    products: Product[];
}>;

export default function ProductsFeed({ products }: Props) {
    return (
        <div>
            <div className="card bg-base-100 shadow-lg">
                <figure>
                    <img src="/placeholder.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
