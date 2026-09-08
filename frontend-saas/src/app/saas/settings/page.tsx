'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Bell, Shield, Globe } from 'lucide-react';
import { saasService } from '@/services/saasService';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
  }, [user, router]);

  const settingsSections = [
    { icon: User, label: 'Profile Settings', description: 'Update your personal information' },
    { icon: Lock, label: 'Security', description: 'Change password and security options' },
    { icon: Bell, label: 'Notifications', description: 'Configure notification preferences' },
    { icon: Shield, label: 'Privacy', description: 'Manage your privacy settings' },
    { icon: Globe, label: 'API Access', description: 'Manage API keys and integrations' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-white">Settings</h1><p className="text-luxury-textMuted">Manage your account preferences</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map(section => (
          <div key={section.label} className="bg-luxury-surface border border-luxury-border p-6 hover:border-luxury-gold cursor-pointer transition-colors">
            <section.icon className="w-8 h-8 text-luxury-gold mb-4" />
            <h3 className="text-white font-semibold mb-1">{section.label}</h3>
            <p className="text-luxury-textMuted text-sm">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-luxury-surface border border-luxury-border p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between p-4 bg-luxury-dark rounded">
          <div><p className="text-white font-medium">Delete Account</p><p className="text-luxury-textMuted text-sm">Permanently delete your account and all data</p></div>
          <button className="px-4 py-2 border border-luxury-error text-luxury-error hover:bg-luxury-error hover:text-white transition-colors">Delete Account</button>
        </div>
      </div>
    </div>
  );
}