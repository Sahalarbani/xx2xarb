import React from 'react';
import { SignInButton } from '../components/SignInButton';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess?: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-dark">
       <div className="max-w-md w-full bg-brand-surface border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
         <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              ARB<span className="text-brand-accent">SKINZ</span>
            </h1>
            <p className="text-gray-400">Secure entry to Arbskinz Dashboard</p>
         </div>

         <div className="space-y-4">
            <SignInButton />
            
            <p className="text-center text-xs text-gray-500 mt-6">
               By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
         </div>
       </div>
    </div>
  );
};