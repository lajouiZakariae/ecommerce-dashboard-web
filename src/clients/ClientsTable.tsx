import EmptyDataRow from '@/common/Loaders/EmptyData';
import Table from '@/common/Table';
import { PropsWithChildren } from 'react';
import { Client } from './types/Client';
import DropdownDefault from '@/components/DropdownDefault';
import DropdownButton from '@/products/DropdownButton';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteResource from '@/common/DeleteResource';

interface Props extends PropsWithChildren {
    headers: { name: string }[];
    clients: Client[];
}

export default function ClientsTable({ headers, clients }: Props) {
    return (
        <Table headers={headers}>
            {clients.length ? (
                clients.map((client) => (
                    <tr key={client.id}>
                        <td>{`${client.first_name} ${client.last_name}`}</td>
                        <td>{client.email}</td>
                        <td>{client.phone_number}</td>
                        <td>{client.city}</td>
                        <td>
                            <DropdownDefault>
                                <Link
                                    to={`/dashboard/clients/${client.id}/edit`}
                                >
                                    <DropdownButton>
                                        <FaEdit />
                                        Edit
                                    </DropdownButton>
                                </Link>

                                <DeleteResource
                                    url={client.url}
                                    queryKey={['clients']}
                                >
                                    Delete
                                </DeleteResource>
                            </DropdownDefault>
                        </td>
                    </tr>
                ))
            ) : (
                <EmptyDataRow cols={headers.length} />
            )}
        </Table>
    );
}
