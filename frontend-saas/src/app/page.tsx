'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle, LayoutDashboard, Building2 as BuildingIcon, MessageSquare, FileText, BarChart3, TrendingUp, DollarSign, Eye as EyeIcon, Users } from 'lucide-react';
import { saasService } from '@/services/saasService';

export default function SaaSLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = saasService.getCurrentUser();
    if (user) router.push('/saas');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await saasService.login(email, password);
      if (user) router.push('/saas');
      else setError('Invalid email or password');
    } catch { setError('An error occurred'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-luxury-dark flex justify-center items-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/saas" className="inline-flex items-center space-x-2"><Building2 className="w-10 h-10 text-luxury-gold" /><span className="font-display text-3xl font-bold text-white">BETAPP</span></Link>
          <p className="text-luxury-textMuted mt-2">Seller Dashboard</p>
        </div>
        <div className="bg-luxury-surface border border-luxury-border p-8">
          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">Sign In</h1>
          <p className="text-luxury-textMuted text-center mb-8">Access your seller dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="flex items-center p-3 bg-luxury-error/10 border border-luxury-error/30"><AlertCircle className="w-5 h-5 text-luxury-error mr-2" /><span className="text-luxury-error text-sm">{error}</span></div>}
            <div><label className="block text-sm text-luxury-textMuted mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@company.com" className="input-field pl-10" required /></div></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="admin123" className="input-field pl-10 pr-10" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-textMuted">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin mx-auto" /> : 'Sign In'}</button>
          </form>
        </div>
        <div className="mt-6 p-4 bg-luxury-charcoal border border-luxury-border">
          <p className="text-luxury-textMuted text-sm text-center"><span className="text-luxury-gold">Email:</span> admin@company.com | <span className="text-luxury-gold">Password:</span> admin123</p>
        </div>
      </div>
    </div>
  );
}