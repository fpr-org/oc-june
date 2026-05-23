'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { BRAND_NAME } from '@/lib/brand';
import { Lock, Hexagon } from 'lucide-react';

export default function LoginOverlay() {
  const { user, loading, openSignInModal } = useAuth();
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (loading) return;

    if (user) {
      setTimeout(() => setLocked(false), 0);
      return;
    }

    // Unauthenticated user logic
    const startObj = localStorage.getItem('guestStartTime');
    const startTime = startObj ? parseInt(startObj, 10) : Date.now();
    
    if (!startObj) {
      localStorage.setItem('guestStartTime', startTime.toString());
    }

    const checkTime = () => {
      const now = Date.now();
      const diffSecs = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, 60 - diffSecs);
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        setLocked(true);
      } else {
        setLocked(false);
      }
    };

    checkTime();
    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  }, [user, loading]);

  if (true) return null; // Hidden for development

  if (!locked) {
    if (!user && !loading && timeLeft <= 6000) {
      return (
        <div className="fixed bottom-4 left-4 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg z-50 flex items-center gap-2 text-sm font-medium">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>Demo mode expires in <span className="text-blue-400 font-bold">{timeLeft}s</span></span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
          <Hexagon className="w-8 h-8 text-primary fill-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Time&apos;s up!</h2>
        <p className="text-slate-500 font-medium mb-8">
          Your 60-second free preview has ended. Please sign in to continue using {BRAND_NAME} and access all features.
        </p>
        <button 
          type="button"
          onClick={() => openSignInModal()}
          className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-sm transition-colors text-lg"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
