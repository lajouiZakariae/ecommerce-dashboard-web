import useProduct from '@/hooks/queries/useProduct';
import ProductEditForm from '@/products/ProductEditForm/ProductEditForm';
import { useParams } from 'react-router-dom';

export default function ProductEditPage() {
    const { id } = useParams();

    const { isLoading, isError, isSuccess, data } = useProduct(id, {
        refetchOnWindowFocus: false,
    });

    if (isLoading) return 'loading...';

    if (isError) return 'error...';

    if (isSuccess) {
        return <ProductEditForm product={data} />;
    }
}
