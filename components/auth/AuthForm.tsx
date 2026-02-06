'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Mail, Lock, Loader, ArrowRight, AlertCircle } from 'lucide-react';
import { CBConnectLogo } from '@/components/CBConnectLogo';

export default function AuthForm({ type = 'general', title, subtitle, defaultView = 'sign_in' }: { type?: 'business' | 'candidate' | 'general', title?: string, subtitle?: string, defaultView?: 'sign_in' | 'sign_up' }) {
    const [isLogin, setIsLogin] = useState(defaultView === 'sign_in');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const getTitle = () => {
        if (title) return title;
        if (type === 'business') return isLogin ? 'Business Portal' : 'Register Business';
        if (type === 'candidate') return isLogin ? 'Candidate Login' : 'Create Profile';
        return isLogin ? 'Welcome Back' : 'Join CB Connect';
    };

    const getSubtitle = () => {
        if (subtitle) return subtitle;
        if (type === 'business') return 'Manage your listing and quotes';
        if (type === 'candidate') return 'Find your dream job in the Caribbean';
        return isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started';
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isLogin) {
                // Sign In
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect handled by client or router refresh
                window.location.href = '/dashboard';
            } else {
                // Sign Up
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            role: type === 'general' ? 'user' : type // Store intended role
                        }
                    },
                });
                if (error) throw error;
                setMessage('Check your email for the confirmation link.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-card border border-border/50 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex justify-center mb-4">
                    <CBConnectLogo size="default" animated />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    {getTitle()}
                </h2>
                <p className="text-muted-foreground">
                    {getSubtitle()}
                </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border border-border rounded-xl px-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border border-border rounded-xl px-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                {message && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
}
