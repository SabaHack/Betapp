'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Settings as SettingsIcon,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Shield
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { currentUserCompany } from '@/data/saasMockData';

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [accountSettings, setAccountSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+251 911 123 456',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [companySettings, setCompanySettings] = useState({
    name: currentUserCompany.name,
    tagline: currentUserCompany.tagline,
    email: currentUserCompany.contact.email,
    phone: currentUserCompany.contact.phone,
    website: currentUserCompany.contact.website,
    address: currentUserCompany.location.address,
    city: currentUserCompany.location.city,
    country: currentUserCompany.location.country
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailInquiries: true,
    emailNegotiations: true,
    emailAgreements: true,
    emailVerification: true,
    pushInquiries: true,
    pushNegotiations: true,
    pushAgreements: false,
    pushVerification: true,
    smsInquiries: false,
    smsNegotiations: false,
    smsAgreements: false
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    language: 'en',
    timezone: 'Africa/Addis_Ababa',
    currency: 'ETB',
    dateFormat: 'MM/DD/YYYY',
    theme: 'dark'
  });

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSave = (section: string) => {
    setSaveMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
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

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  return (
    <SaaSLayout 
      userName={user.name}
      companyName={currentUserCompany.name}
      notificationCount={3}
    >
      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-luxury-textMuted">
            Manage your account and application preferences
          </p>
        </div>

        {saveMessage && (
          <div className="bg-luxury-success/20 border border-luxury-success/30 text-luxury-success px-4 py-3 rounded-lg mb-6">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-luxury-surface border border-luxury-border rounded-lg p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-luxury-gold text-luxury-black'
                  : 'text-luxury-textMuted hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">First Name</label>
                  <input
                    type="text"
                    value={accountSettings.firstName}
                    onChange={(e) => setAccountSettings({ ...accountSettings, firstName: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Last Name</label>
                  <input
                    type="text"
                    value={accountSettings.lastName}
                    onChange={(e) => setAccountSettings({ ...accountSettings, lastName: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                    <input
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                    <input
                      type="tel"
                      value={accountSettings.phone}
                      onChange={(e) => setAccountSettings({ ...accountSettings, phone: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-luxury-border pt-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={accountSettings.currentPassword}
                        onChange={(e) => setAccountSettings({ ...accountSettings, currentPassword: e.target.value })}
                        className="input-field pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-textMuted hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={accountSettings.newPassword}
                        onChange={(e) => setAccountSettings({ ...accountSettings, newPassword: e.target.value })}
                        className="input-field pr-10"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-textMuted hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={accountSettings.confirmPassword}
                      onChange={(e) => setAccountSettings({ ...accountSettings, confirmPassword: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('account')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Company Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Tagline</label>
                  <input
                    type="text"
                    value={companySettings.tagline}
                    onChange={(e) => setCompanySettings({ ...companySettings, tagline: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                      <input
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                      <input
                        type="tel"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                      <input
                        type="url"
                        value={companySettings.website}
                        onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">City</label>
                    <input
                      type="text"
                      value={companySettings.city}
                      onChange={(e) => setCompanySettings({ ...companySettings, city: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-luxury-textMuted mb-2">Country</label>
                    <input
                      type="text"
                      value={companySettings.country}
                      onChange={(e) => setCompanySettings({ ...companySettings, country: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-luxury-textMuted mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                      <input
                        type="text"
                        value={companySettings.address}
                        onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('company')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </h2>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'emailInquiries', label: 'New inquiries' },
                      { key: 'emailNegotiations', label: 'Negotiation updates' },
                      { key: 'emailAgreements', label: 'Agreement changes' },
                      { key: 'emailVerification', label: 'Verification status' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-luxury-textMuted">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ 
                              ...notificationSettings, 
                              [item.key]: e.target.checked 
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-luxury-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxury-gold"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="border-t border-luxury-border pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'pushInquiries', label: 'New inquiries' },
                      { key: 'pushNegotiations', label: 'Negotiation updates' },
                      { key: 'pushAgreements', label: 'Agreement changes' },
                      { key: 'pushVerification', label: 'Verification status' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-luxury-textMuted">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ 
                              ...notificationSettings, 
                              [item.key]: e.target.checked 
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-luxury-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxury-gold"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="border-t border-luxury-border pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">SMS Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'smsInquiries', label: 'New inquiries' },
                      { key: 'smsNegotiations', label: 'Negotiation updates' },
                      { key: 'smsAgreements', label: 'Agreement changes' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-luxury-textMuted">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ 
                              ...notificationSettings, 
                              [item.key]: e.target.checked 
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-luxury-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxury-gold"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('notifications')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2" />
                Preferences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Language</label>
                  <select
                    value={preferenceSettings.language}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, language: e.target.value })}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="am">Amharic</option>
                    <option value="or">Oromo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Timezone</label>
                  <select
                    value={preferenceSettings.timezone}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, timezone: e.target.value })}
                    className="input-field"
                  >
                    <option value="Africa/Addis_Ababa">Africa/Addis_Ababa</option>
                    <option value="Africa/Nairobi">Africa/Nairobi</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Currency</label>
                  <select
                    value={preferenceSettings.currency}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, currency: e.target.value })}
                    className="input-field"
                  >
                    <option value="ETB">ETB - Ethiopian Birr</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Date Format</label>
                  <select
                    value={preferenceSettings.dateFormat}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, dateFormat: e.target.value })}
                    className="input-field"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-luxury-textMuted mb-2">Theme</label>
                  <select
                    value={preferenceSettings.theme}
                    onChange={(e) => setPreferenceSettings({ ...preferenceSettings, theme: e.target.value })}
                    className="input-field"
                  >
                    <option value="dark">Dark (Default)</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('preferences')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SaaSLayout>
  );
}
