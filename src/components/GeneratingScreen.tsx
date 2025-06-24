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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl flex items-center justify-center">
            <Zap size={40} className="text-white animate-pulse" />
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping"></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles size={24} className="animate-spin" />
            {t.generating}{dots}
          </h2>
          <p className="text-white/80 text-lg">{t.generatingSubtext}</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};