import Breadcrumb from '@/components/Breadcrumb';
import useCategories from '@/hooks/queries/categories/useCategories';
import ProductCreateForm from '@/components/products/ProductEditForm/ProductCreateForm';

export default function ProductCreatePage() {
    return (
        <>
            <Breadcrumb
                links={[
                    { text: 'Dashboard', path: '/dashboard' },
                    { text: 'Products', path: '/dashboard/products' },
                ]}
                pageName="Create"
            />
            <ProductCreateForm />;
        </>
    );
}
