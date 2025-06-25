import React, { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-300 to-orange-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-cyan-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-200/10 to-orange-200/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl">
            <img 
              src="/logo.png" 
              alt="Hero AI Logo" 
              className="w-20 h-20 object-contain animate-pulse"
            />
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping"></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white/80 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-center max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles size={28} className="animate-spin text-orange-200" />
            {t.generating}{dots}
          </h2>
          <p className="text-white/90 text-xl font-medium">{t.generatingSubtext}</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-10 w-80 mx-auto">
          <div className="h-3 bg-white/30 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};