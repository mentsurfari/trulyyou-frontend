
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NotificationsPopoverProps {
    onClose: () => void;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ onClose }) => {
    const { notifications, unreadCount, markNotificationAsRead } = useAuth();
    const popoverRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleNotificationClick = (id: string, link: string) => {
        markNotificationAsRead(id);
        navigate(link);
        onClose();
    };

    return (
        <div ref={popoverRef} className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in-down">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-brand-charcoal">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-sm text-slate-500 p-4 text-center">You have no notifications yet.</p>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n._id}
                            onClick={() => handleNotificationClick(n._id, n.link)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-brand-light-gray/50 ${!n.read ? 'bg-brand-light-teal/30' : ''}`}
                        >
                            <p className="text-sm text-slate-700">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
            <style>{`
            @keyframes fade-in-down {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default NotificationsPopover;
