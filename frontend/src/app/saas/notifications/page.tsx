'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  Filter,
  Search,
  MessageSquare,
  DollarSign,
  FileText,
  ShieldCheck,
  Calendar,
  Clock
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockNotifications, currentUserCompany } from '@/data/saasMockData';

export default function NotificationsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'inquiry':
        return <MessageSquare className="w-5 h-5" />;
      case 'negotiation':
        return <DollarSign className="w-5 h-5" />;
      case 'agreement':
        return <FileText className="w-5 h-5" />;
      case 'verification':
        return <ShieldCheck className="w-5 h-5" />;
      case 'system':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'inquiry':
        return 'bg-blue-500/20 text-blue-400';
      case 'negotiation':
        return 'bg-luxury-gold/20 text-luxury-gold';
      case 'agreement':
        return 'bg-green-500/20 text-green-400';
      case 'verification':
        return 'bg-purple-500/20 text-purple-400';
      case 'system':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-luxury-muted text-luxury-textMuted';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SaaSLayout 
      userName={user.name}
      companyName={currentUserCompany.name}
      notificationCount={unreadCount}
    >
      <div className="h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Notifications
            </h1>
            <p className="text-luxury-textMuted">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="btn-secondary flex items-center space-x-2"
            >
              <CheckCheck className="w-5 h-5" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-luxury-surface border border-luxury-border p-4 rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxury-dark border border-luxury-border rounded-lg pl-10 pr-4 py-2 text-white placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white hover:border-luxury-gold transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {showFilters && (
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
              >
                <option value="all">All Types</option>
                <option value="inquiry">Inquiries</option>
                <option value="negotiation">Negotiations</option>
                <option value="agreement">Agreements</option>
                <option value="verification">Verification</option>
                <option value="system">System</option>
              </select>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-luxury-textMuted opacity-50" />
              <p className="text-luxury-textMuted mb-4">No notifications found</p>
              <p className="text-luxury-textMuted text-sm">
                {searchQuery || typeFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-luxury-surface border rounded-lg p-4 transition-colors ${
                    !notification.read 
                      ? 'border-luxury-gold bg-luxury-gold/5' 
                      : 'border-luxury-border'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-luxury-textMuted'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-luxury-textMuted text-xs flex items-center whitespace-nowrap ml-4">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-luxury-textMuted text-sm mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      {notification.relatedId && (
                        <button className="text-luxury-gold text-sm hover:underline">
                          View Details
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 text-luxury-gold hover:text-white transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SaaSLayout>
  );
}
