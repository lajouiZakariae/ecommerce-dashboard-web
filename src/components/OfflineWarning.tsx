import Alert from '@/common/Alert/Alert';
import { useEffect, useState } from 'react';

export default function OfflineWarning() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const offlineHandler = () => setShow(true);

        const onlineHandler = () => setShow(false);

        window.addEventListener('offline', offlineHandler);

        window.addEventListener('online', onlineHandler);

        return () => {
            window.removeEventListener('offline', offlineHandler);
            window.removeEventListener('online', onlineHandler);
        };
    }, []);

    return show ? (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-99999">
            <Alert variant="danger">
                Make sure You are Connected to the internet!
            </Alert>
        </div>
    ) : null;
}
