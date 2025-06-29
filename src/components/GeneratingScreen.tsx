import React, { useEffect, useState } from 'react';
import { Cpu, Zap, Sparkles, BookOpen, Image, CheckCircle } from 'lucide-react';
import { translations, Language } from '../i18n/translations';

interface GeneratingScreenProps {
  selectedLanguage: string;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({ selectedLanguage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const t = translations[selectedLanguage as Language];

  const steps = [
    { icon: Cpu, text: "Analyse des paramètres...", duration: 2000 },
    { icon: BookOpen, text: "Création de l'histoire...", duration: 4000 },
    { icon: Image, text: "Génération de l'illustration...", duration: 3000 },
    { icon: CheckCircle, text: "Finalisation...", duration: 1000 }
  ];

  useEffect(() => {
    let totalDuration = 0;
    const intervals: NodeJS.Timeout[] = [];

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, totalDuration);
      intervals.push(timeout);
      totalDuration += step.duration;
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, totalDuration / 100);

    return () => {
      intervals.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <img 
              src="/logo.png" 
              alt="Hero AI" 
              className="w-20 h-20 object-contain filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-8">
            Création en cours...
          </h2>

          {/* Current step */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white scale-110 shadow-lg'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                );
              })}
            </div>
            <p className="text-xl text-white/90 font-medium">
              {steps[currentStep]?.text}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white/70 mt-3">{progress}%</p>
          </div>

          {/* Loading animation */}
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};