import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import useCategories from '@/hooks/queries/useCategories';
import useProduct from '@/hooks/queries/useProduct';
import ProductEditForm from '@/products/ProductEditForm/ProductEditForm';

export default function ProductEditPage() {
    const { id } = useParams();

    const { isLoading, isError, isSuccess, data } = useProduct(id);

    const categories = useCategories();

    if (isLoading) return 'loading...';

    if (isError) return 'error...';

    if (isSuccess && categories.isSuccess) {
        return (
            <>
                <Breadcrumb pageName="Edit" />
                <ProductEditForm product={data} categories={categories.data} />;
            </>
        );
    }
}
