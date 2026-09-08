'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Notification } from '@/types/property';

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setNotifications(saasService.getNotifications());
  }, [user, router]);

  const handleMarkRead = (id: string) => {
    saasService.markNotificationRead(id);
    setNotifications(saasService.getNotifications());
  };

  const handleMarkAllRead = () => {
    saasService.markAllNotificationsRead();
    setNotifications(saasService.getNotifications());
  };

  const iconMap = { info: Info, success: CheckCircle, warning: AlertCircle, error: AlertIcon as any };
  const colorMap = { info: 'text-blue-400 bg-blue-400/10', success: 'text-luxury-success bg-luxury-success/10', warning: 'text-luxury-gold bg-luxury-gold/10', error: 'text-luxury-error bg-luxury-error/10' };

  function AlertIcon(props: any) { return <AlertCircle {...props} />; }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Notifications</h1><p className="text-luxury-textMuted">{unreadCount} unread notifications</p></div>
        {unreadCount > 0 && <button onClick={handleMarkAllRead} className="btn-secondary text-sm">Mark All as Read</button>}
      </div>

      <div className="space-y-4">
        {notifications.map(notification => {
          const Icon = iconMap[notification.type];
          return (
            <div key={notification.id} className={`bg-luxury-surface border border-luxury-border p-6 ${!notification.read ? 'border-luxury-gold' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[notification.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold">{notification.title}</h3>
                    <span className="text-luxury-textMuted text-sm">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-luxury-textMuted">{notification.message}</p>
                </div>
                {!notification.read && (
                  <button onClick={() => handleMarkRead(notification.id)} className="text-luxury-gold text-sm hover:underline">Mark Read</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}