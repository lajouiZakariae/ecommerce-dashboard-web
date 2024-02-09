import { PropsWithChildren } from 'react';
import Alert from './Alert/Alert';

export default function ErrorUI({ children }: PropsWithChildren) {
    return <Alert variant="danger">{children}</Alert>;
}
