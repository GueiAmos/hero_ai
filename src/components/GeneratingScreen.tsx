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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100">
            <img 
              src="/logo.png" 
              alt="Hero AI" 
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-8">
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
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                );
              })}
            </div>
            <p className="text-xl text-gray-700 font-medium">
              {steps[currentStep]?.text}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-3 font-medium">{progress}%</p>
          </div>

          {/* Loading animation */}
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Fun fact */}
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <p className="text-purple-700 text-sm font-medium">
              ✨ Chaque histoire génère un personnage d'âge et de profession uniques !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};