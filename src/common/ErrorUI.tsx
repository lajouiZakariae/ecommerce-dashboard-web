import { IoAlertCircleOutline } from 'react-icons/io5';
import Alert from './Alert/Alert';

export default function ErrorUI() {
    return (
        <Alert variant="error" className="flex items-center space-x-2 text-lg">
            <IoAlertCircleOutline />
            <span>Server Error</span>
        </Alert>
    );
}
