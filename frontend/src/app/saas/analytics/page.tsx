'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MessageSquare, 
  DollarSign, 
  Calendar,
  BarChart3,
  Filter,
  Download
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockAnalytics, currentUserCompany } from '@/data/saasMockData';

export default function AnalyticsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedProperty, setSelectedProperty] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-luxury-success' : 'text-luxury-error';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

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
      notificationCount={3}
    >
      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Analytics
            </h1>
            <p className="text-luxury-textMuted">
              Track your property performance and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-luxury-surface border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-luxury-gold/20 rounded-lg flex items-center justify-center text-luxury-gold">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`flex items-center space-x-1 text-xs sm:text-sm text-luxury-success`}>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+12%</span>
              </span>
            </div>
            <p className="text-luxury-textMuted text-xs sm:text-sm mb-1">Total Views</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{formatNumber(mockAnalytics.totalViews)}</p>
          </div>

          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`flex items-center space-x-1 text-xs sm:text-sm text-luxury-success`}>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+8%</span>
              </span>
            </div>
            <p className="text-luxury-textMuted text-xs sm:text-sm mb-1">Total Inquiries</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{formatNumber(mockAnalytics.totalInquiries)}</p>
          </div>

          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-luxury-success/20 rounded-lg flex items-center justify-center text-luxury-success">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`flex items-center space-x-1 text-xs sm:text-sm text-luxury-success`}>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+15%</span>
              </span>
            </div>
            <p className="text-luxury-textMuted text-xs sm:text-sm mb-1">Total Negotiations</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{formatNumber(mockAnalytics.totalNegotiations)}</p>
          </div>

          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`flex items-center space-x-1 text-xs sm:text-sm text-luxury-success`}>
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+5%</span>
              </span>
            </div>
            <p className="text-luxury-textMuted text-xs sm:text-sm mb-1">Conversion Rate</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{mockAnalytics.conversionRate}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Views Over Time */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-white font-semibold text-sm sm:text-base flex items-center">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Views Over Time
              </h3>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-textMuted" />
            </div>
            
            <div className="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
              {[
                { label: 'Jan', value: 2800 },
                { label: 'Feb', value: 3200 },
                { label: 'Mar', value: 2900 },
                { label: 'Apr', value: 3500 },
                { label: 'May', value: 3100 },
                { label: 'Jun', value: 3451 }
              ].map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-luxury-gold/80 rounded-t transition-all hover:bg-luxury-gold"
                    style={{ height: `${(data.value / 3500) * 100}%` }}
                  />
                  <span className="text-[10px] sm:text-xs text-luxury-textMuted mt-1 sm:mt-2">{data.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiries Over Time */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-white font-semibold text-sm sm:text-base flex items-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Inquiries Over Time
              </h3>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-textMuted" />
            </div>
            
            <div className="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
              {[
                { label: 'Jan', value: 150 },
                { label: 'Feb', value: 165 },
                { label: 'Mar', value: 140 },
                { label: 'Apr', value: 180 },
                { label: 'May', value: 170 },
                { label: 'Jun', value: 191 }
              ].map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500/80 rounded-t transition-all hover:bg-blue-500"
                    style={{ height: `${(data.value / 180) * 100}%` }}
                  />
                  <span className="text-[10px] sm:text-xs text-luxury-textMuted mt-1 sm:mt-2">{data.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <h3 className="text-white font-semibold text-sm sm:text-base flex items-center">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Property Performance
            </h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-textMuted" />
              <select className="bg-luxury-dark border border-luxury-border rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-luxury-gold">
                <option value="all">All Types</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            {mockAnalytics.propertyPerformance.length === 0 ? (
              <div className="text-center py-8 text-luxury-textMuted">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No property performance data available</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="text-left text-luxury-textMuted text-sm font-medium py-3 px-4">Property</th>
                    <th className="text-right text-luxury-textMuted text-sm font-medium py-3 px-4">Views</th>
                    <th className="text-right text-luxury-textMuted text-sm font-medium py-3 px-4">Inquiries</th>
                    <th className="text-right text-luxury-textMuted text-sm font-medium py-3 px-4">Negotiations</th>
                    <th className="text-right text-luxury-textMuted text-sm font-medium py-3 px-4">Days Listed</th>
                    <th className="text-right text-luxury-textMuted text-sm font-medium py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalytics.propertyPerformance.map((property, index) => (
                    <tr key={index} className="border-b border-luxury-border hover:bg-luxury-dark/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold font-bold">
                            {property.propertyTitle.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{property.propertyTitle}</p>
                            <p className="text-luxury-textMuted text-sm">{property.propertyId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-white">{formatNumber(property.views)}</td>
                      <td className="text-right py-3 px-4 text-white">{formatNumber(property.inquiries)}</td>
                      <td className="text-right py-3 px-4 text-white">{formatNumber(property.negotiations)}</td>
                      <td className="text-right py-3 px-4 text-white">{property.daysListed}</td>
                      <td className="text-right py-3 px-4">
                        <span className="px-2 py-1 bg-luxury-success/20 text-luxury-success rounded-full text-xs">
                          {property.currentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {mockAnalytics.propertyPerformance.length === 0 ? (
              <div className="text-center py-8 text-luxury-textMuted">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No property performance data available</p>
              </div>
            ) : (
              mockAnalytics.propertyPerformance.map((property, index) => (
                <div key={index} className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold font-bold">
                      {property.propertyTitle.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{property.propertyTitle}</p>
                      <p className="text-luxury-textMuted text-xs">{property.propertyId}</p>
                    </div>
                    <span className="px-2 py-1 bg-luxury-success/20 text-luxury-success rounded-full text-xs">
                      {property.currentStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-luxury-textMuted text-[10px]">Views</p>
                      <p className="text-white text-sm font-medium">{formatNumber(property.views)}</p>
                    </div>
                    <div>
                      <p className="text-luxury-textMuted text-[10px]">Inquiries</p>
                      <p className="text-white text-sm font-medium">{formatNumber(property.inquiries)}</p>
                    </div>
                    <div>
                      <p className="text-luxury-textMuted text-[10px]">Negotiations</p>
                      <p className="text-white text-sm font-medium">{formatNumber(property.negotiations)}</p>
                    </div>
                    <div>
                      <p className="text-luxury-textMuted text-[10px]">Days</p>
                      <p className="text-white text-sm font-medium">{property.daysListed}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-4 sm:p-6">
          <h3 className="text-white font-semibold mb-4 sm:mb-6 flex items-center text-sm sm:text-base">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Top Performing Properties
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnalytics.propertyPerformance.length === 0 ? (
              <div className="col-span-full text-center py-8 text-luxury-textMuted">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No top performing properties yet</p>
              </div>
            ) : (
              mockAnalytics.propertyPerformance.slice(0, 3).map((property, index) => (
                <div key={index} className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{property.propertyTitle}</p>
                      <p className="text-luxury-textMuted text-xs">{property.propertyId}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-luxury-textMuted">Views</span>
                      <span className="text-white font-medium">{formatNumber(property.views)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-luxury-textMuted">Inquiries</span>
                      <span className="text-white font-medium">{formatNumber(property.inquiries)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-luxury-textMuted">Conversion</span>
                      <span className="text-luxury-gold font-medium">
                        {((property.negotiations / property.views) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
