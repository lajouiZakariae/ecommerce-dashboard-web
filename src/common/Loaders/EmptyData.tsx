import Alert from '../Alert/Alert';

export default function EmptyDataRow({ cols }: { cols: number }) {
    return (
        <tr>
            <td colSpan={cols}>
                <Alert variant="warning">No Orders Found</Alert>
            </td>
        </tr>
    );
}
