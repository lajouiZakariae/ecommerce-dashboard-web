import ClientCreateForm from '@/clients/ClientCreateForm';
import Breadcrumb from '@/components/Breadcrumb';

export default function ClientCreatePage() {
    return (
        <>
            <Breadcrumb
                links={[
                    { text: 'Dashboard', path: '/dashboard' },
                    { text: 'Products', path: '/dashboard/products' },
                ]}
                pageName={'Create Product'}
            />

            <ClientCreateForm />
        </>
    );
}
