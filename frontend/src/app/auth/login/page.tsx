'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store mock user
    localStorage.setItem('betapp_user', JSON.stringify({
      id: '1',
      name: 'Demo User',
      email,
    }));
    
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-luxury-dark flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Building2 className="w-10 h-10 text-luxury-gold" />
            <span className="font-display text-3xl font-bold text-white tracking-wide">
              BETAPP
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-luxury-surface border border-luxury-border p-8">
          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-luxury-textMuted text-center mb-8">
            Sign in to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-luxury-textMuted mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-luxury-textMuted mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-textMuted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 bg-luxury-muted border-luxury-border rounded" />
                <span className="ml-2 text-sm text-luxury-textMuted">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-luxury-gold hover:text-luxury-goldLight">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-luxury-textMuted">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-luxury-gold hover:text-luxury-goldLight">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-luxury-charcoal border border-luxury-border text-center">
          <p className="text-luxury-textMuted text-sm">
            This is a demo. Click "Sign In" to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}