import NotFound from '@/common/NotFound';
import Breadcrumb from '@/components/Breadcrumb';
import usePaymentMethod from '@/hooks/queries/usePaymentMethod';
import PaymentMethodEditForm from '@/payment-methods/PaymentMethodEditForm';
import ProductEditForm from '@/products/ProductEditForm/ProductEditForm';
import { useParams } from 'react-router-dom';

export default function PaymentMethodEditPage() {
    const { id } = useParams();

    const { isLoading, error, isSuccess, data } = usePaymentMethod(id, {
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return 'loading...';

    if (error?.response?.status === 404) return <NotFound />;

    if (error) return 'error...';

    if (isSuccess) {
        return (
            <>
                <Breadcrumb
                    links={[
                        { text: 'Dashboard', path: '/' },
                        { text: 'Payment Methods', path: '/payment-methods' },
                    ]}
                    pageName={data.name}
                />
                <PaymentMethodEditForm paymentMethod={data} />;
            </>
        );
    }
}
