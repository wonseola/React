import { useState, useEffect } from 'react';

export const Welcome = () => {
    const [showPage, setShowPage] = useState(true);

    useEffect(() => {
        // 5초 후 페이지를 숨깁니다.
        const timeout = setTimeout(() => {
            setShowPage(false);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>

            {!showPage && <div>페이지가 사라졌습니다.</div>}
        </div>
    );
};

