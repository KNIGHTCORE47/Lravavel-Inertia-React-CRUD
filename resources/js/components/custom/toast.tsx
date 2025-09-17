// components/custom/toast.tsx
import { useState, useEffect } from 'react';

export default function Toast({ style, toastMSG }: { style?: string, toastMSG: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Show toast after component mounts
        setIsVisible(true);

        // Start hide animation after 2.5 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        // Remove from DOM after animation completes
        const removeTimer = setTimeout(() => {
            setShouldRender(false);
        }, 3000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={`
                fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-500 ease-in-out transform
                ${isVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : '-translate-y-2 opacity-0 scale-95'
                }
                ${style || 'bg-green-50 border-green-200 text-green-800'}
            `}
        >
            <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-sm font-medium">
                    {toastMSG}
                </span>
            </div>
        </div>
    );
}