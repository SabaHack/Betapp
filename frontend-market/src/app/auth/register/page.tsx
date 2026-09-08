'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '@/data/users';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const user = await authService.register({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone, password: formData.password });
      localStorage.setItem('betapp_user', JSON.stringify(user));
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) { setError(err.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-luxury-dark flex justify-center items-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8"><Link href="/" className="inline-flex items-center space-x-2"><Building2 className="w-10 h-10 text-luxury-gold" /><span className="font-display text-3xl font-bold text-white">BETAPP</span></Link></div>
        <div className="bg-luxury-surface border border-luxury-border p-8">
          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">Create Account</h1>
          <p className="text-luxury-textMuted text-center mb-8">Join BETAPP</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="flex items-center p-3 bg-luxury-error/10 border border-luxury-error/30"><AlertCircle className="w-5 h-5 text-luxury-error mr-2" /><span className="text-luxury-error text-sm">{error}</span></div>}
            {success && <div className="flex items-center p-3 bg-luxury-success/10 border border-luxury-success/30"><CheckCircle className="w-5 h-5 text-luxury-success mr-2" /><span className="text-luxury-success text-sm">Account created! Redirecting...</span></div>}
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm text-luxury-textMuted mb-2">First Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="input-field pl-10" required /></div></div>
              <div><label className="block text-sm text-luxury-textMuted mb-2">Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="input-field" required /></div>
            </div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-10" required /></div></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Phone</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+251 911 234 567" className="input-field pl-10" /></div></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Create password" className="input-field pl-10 pr-10" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-textMuted">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="input-field pl-10" required /></div></div>
            <div className="flex items-start"><input type="checkbox" className="w-4 h-4 bg-luxury-muted border-luxury-border rounded mt-1" required /><span className="ml-2 text-sm text-luxury-textMuted">I agree to the <Link href="#" className="text-luxury-gold">Terms</Link></span></div>
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin mx-auto" /> : 'Create Account'}</button>
          </form>
          <div className="mt-6 text-center"><p className="text-luxury-textMuted">Already have an account? <Link href="/auth/login" className="text-luxury-gold">Sign in</Link></p></div>
        </div>
      </div>
    </div>
  );
}