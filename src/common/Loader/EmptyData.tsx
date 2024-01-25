import Alert from '../Alert/Alert';

export default function EmptyData() {
    return (
        <tr>
            <td colSpan={8}>
                <Alert variant="warning">No Products Found</Alert>
            </td>
        </tr>
    );
}
