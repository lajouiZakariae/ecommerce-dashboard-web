import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

    useEffect(() => {
        const className = 'dark';
        const bodyClass = window.document.body.classList;

        if (colorMode === 'dark') {
            bodyClass.add(className);
            document.body.dataset.theme = 'dark';
        } else {
            bodyClass.remove(className);
            delete document.body.dataset.theme;
        }
    }, [colorMode]);

    return [colorMode, setColorMode];
};

export default useColorMode;
