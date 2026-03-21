import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MatrixRain from '../components/portfolio/MatrixRain';

const SECRET_PASSWORD = 'root@jgeisler';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === SECRET_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        navigate('/shell');
      } else {
        setError('Access denied. Invalid credentials.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <MatrixRain />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-card border border-primary/30 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/60">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">root@portfolio — admin access</span>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-mono font-bold text-foreground text-lg">Admin Access</h1>
                <p className="font-mono text-xs text-muted-foreground">sudo ./edit-portfolio.sh</p>
              </div>
            </div>

            <div className="font-mono text-xs text-muted-foreground mb-6 space-y-1">
              <p><span className="text-primary/60">$</span> Restricted area detected</p>
              <p><span className="text-primary/60">$</span> Authentication required...</p>
              <p><span className="text-primary/60">$</span> Enter credentials to proceed<span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-pulse" /></p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-primary/60">password:</span>
                <Input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="pl-24 pr-10 bg-secondary border-border font-mono text-sm"
                  placeholder="••••••••••••••"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="font-mono text-xs text-red-400 flex items-center gap-2">
                  <span className="text-red-400">✗</span> {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-mono font-semibold gap-2"
              >
                <Terminal className="w-4 h-4" />
                {loading ? 'Authenticating...' : './authenticate'}
              </Button>
            </form>

            <button
              onClick={() => navigate('/')}
              className="mt-4 w-full font-mono text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              ← back to portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}