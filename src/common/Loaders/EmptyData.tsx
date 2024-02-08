import Alert from '../Alert/Alert';

export default function EmptyDataRow({ cols }: { cols: number }) {
    return (
        <tr>
            <td colSpan={cols}>
                <Alert color="warning">No Products Found</Alert>
            </td>
        </tr>
    );
}
