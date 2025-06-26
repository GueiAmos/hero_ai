import React, { useEffect, useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { translations, Language } from '../i18n/translations';

interface GeneratingScreenProps {
  selectedLanguage: string;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({ selectedLanguage }) => {
  const [dots, setDots] = useState('');
  const t = translations[selectedLanguage as Language];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-amber-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-indigo-100/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-100/10 to-amber-100/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-slate-200">
            <img 
              src="/logo.png" 
              alt="Hero AI Logo" 
              className="w-20 h-20 object-contain animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-amber-500/20 rounded-3xl animate-ping"></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-slate-700 text-center max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Wand2 size={28} className="animate-spin text-indigo-500" />
            {t.generating}{dots}
          </h2>
          <p className="text-slate-600 text-xl font-medium">{t.generatingSubtext}</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-10 w-80 mx-auto">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};