'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authService } from '@/data/users';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.login(email, password);
      if (user) { localStorage.setItem('betapp_user', JSON.stringify(user)); router.push('/dashboard'); }
      else setError('Invalid email or password');
    } catch { setError('An error occurred'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-luxury-dark flex justify-center items-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8"><Link href="/" className="inline-flex items-center space-x-2"><Building2 className="w-10 h-10 text-luxury-gold" /><span className="font-display text-3xl font-bold text-white">BETAPP</span></Link></div>
        <div className="bg-luxury-surface border border-luxury-border p-8">
          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">Welcome Back</h1>
          <p className="text-luxury-textMuted text-center mb-8">Sign in to your account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="flex items-center p-3 bg-luxury-error/10 border border-luxury-error/30"><AlertCircle className="w-5 h-5 text-luxury-error mr-2" /><span className="text-luxury-error text-sm">{error}</span></div>}
            <div><label className="block text-sm text-luxury-textMuted mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-10" required /></div></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="input-field pl-10 pr-10" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-textMuted">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin mx-auto" /> : 'Sign In'}</button>
          </form>
          <div className="mt-6 text-center"><p className="text-luxury-textMuted">Don't have an account? <Link href="/auth/register" className="text-luxury-gold">Create one</Link></p></div>
        </div>
        <div className="mt-6 p-4 bg-luxury-charcoal border border-luxury-border">
          <p className="text-luxury-textMuted text-sm text-center mb-2">Demo:</p><div className="text-xs text-luxury-textMuted"><p><span className="text-luxury-gold">Email:</span> john@example.com</p><p><span className="text-luxury-gold">Password:</span> password123</p></div>
        </div>
      </div>
    </div>
  );
}