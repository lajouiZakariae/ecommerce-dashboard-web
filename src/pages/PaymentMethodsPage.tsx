import Alert from '@/common/Alert/Alert';
import FormGroup from '@/common/FormGroup';
import Input from '@/common/Input';
import Table from '@/common/Table';
import TableLoading from '@/common/Loaders/TableLoading';
import Breadcrumb from '@/components/Breadcrumb';
import usePaymentMethodes from '@/hooks/queries/usePaymentMethods';
import PaymentMethodRow from '@/payment-methods/PaymentMethodRow';

export default function PaymentMethodsPage() {
    const { isLoading, error, isSuccess, data } = usePaymentMethodes();

    const headers = [
        { name: 'Name' },
        { name: 'Description', colSpan: 3 },
        { name: '' },
    ];

    const renderContext = () => {
        if (isLoading)
            return (
                <TableLoading
                    className="mx-auto"
                    count={10}
                    headers={headers}
                />
            );

        if (error) return <Alert variant="error">500 Server Error</Alert>;

        if (isSuccess)
            return (
                <Table className="mx-auto" headers={headers}>
                    {data.map((paymentMethod) => (
                        <PaymentMethodRow
                            key={paymentMethod.id}
                            {...paymentMethod}
                        />
                    ))}
                </Table>
            );
    };

    return (
        <div>
            <Breadcrumb
                links={[{ text: 'Dashboard', path: '/' }]}
                pageName="Payment Methods"
            />

            {renderContext()}
        </div>
    );
}
