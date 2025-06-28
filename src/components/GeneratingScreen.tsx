import React, { useEffect, useState } from 'react';
import { Sparkles, Wand2, Zap, Star, Rocket } from 'lucide-react';
import { translations, Language } from '../i18n/translations';

interface GeneratingScreenProps {
  selectedLanguage: string;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({ selectedLanguage }) => {
  const [dots, setDots] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const t = translations[selectedLanguage as Language];

  const steps = [
    { icon: Wand2, text: "Création du personnage unique..." },
    { icon: Sparkles, text: "Tissage de l'intrigue magique..." },
    { icon: Star, text: "Génération de l'illustration..." },
    { icon: Rocket, text: "Finalisation de votre aventure..." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-100/10 to-pink-100/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Animated Logo */}
        <div className="mb-12">
          <div className="relative mx-auto w-40 h-40 bg-white/90 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/50 p-8">
            <img 
              src="/logo.png" 
              alt="Hero AI Logo" 
              className="w-full h-full object-contain animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl animate-ping"></div>
          </div>
        </div>

        {/* Main Loading Text */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-4">
            <Zap size={32} className="animate-spin text-purple-500" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              {t.generating}{dots}
            </span>
          </h2>
          <p className="text-slate-600 text-xl font-medium">{t.generatingSubtext}</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                );
              })}
            </div>
            <p className="text-lg font-medium text-slate-700">
              {steps[currentStep].text}
            </p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-12">
          <div className="flex justify-center space-x-3">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse shadow-lg transition-all duration-1000"
                 style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Étape {currentStep + 1} sur {steps.length}
          </p>
        </div>

        {/* Fun Facts */}
        <div className="mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
              <Star size={16} className="text-yellow-500" />
              Saviez-vous ? Chaque histoire génère un personnage d'âge et de profession uniques !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};