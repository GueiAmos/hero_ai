import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';
import { ArrowLeft, Sparkles, User, Key, FileText } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGeneration: (heroName: string, secretWord: string, language: string, size: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onBack: () => void;
}

const languages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGeneration,
  selectedLanguage,
  onLanguageChange,
  onBack
}) => {
  const [heroName, setHeroName] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [storySize, setStorySize] = useState('medium');
  const [errors, setErrors] = useState<{ heroName?: string; secretWord?: string }>({});

  const t = translations[selectedLanguage as Language];

  const storySizeOptions: StorySizeOption[] = [
    { code: 'small', name: t.storySizes.small, description: t.storySizeDescriptions.small },
    { code: 'medium', name: t.storySizes.medium, description: t.storySizeDescriptions.medium },
    { code: 'long', name: t.storySizes.long, description: t.storySizeDescriptions.long },
    { code: 'veryLong', name: t.storySizes.veryLong, description: t.storySizeDescriptions.veryLong }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { heroName?: string; secretWord?: string } = {};
    
    if (!heroName.trim()) {
      newErrors.heroName = t.fieldRequired;
    }
    
    if (!secretWord.trim()) {
      newErrors.secretWord = t.fieldRequired;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onStartGeneration(heroName.trim(), secretWord.trim(), selectedLanguage, storySize);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-300/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-orange-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors rounded-xl hover:bg-white/50"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-200">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3">
                <img 
                  src="/logo.png" 
                  alt="Hero AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{t.slogan}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <User size={18} className="text-blue-500" />
                {t.heroNameLabel}
              </label>
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder={t.heroNamePlaceholder}
                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg font-medium ${
                  errors.heroName 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-300 focus:border-blue-400 bg-white'
                }`}
              />
              {errors.heroName && (
                <p className="text-red-500 text-sm mt-2 font-medium">{errors.heroName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Key size={18} className="text-orange-500" />
                {t.secretWordLabel}
              </label>
              <input
                type="text"
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
                placeholder={t.secretWordPlaceholder}
                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg font-medium ${
                  errors.secretWord 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-300 focus:border-blue-400 bg-white'
                }`}
              />
              {errors.secretWord && (
                <p className="text-red-500 text-sm mt-2 font-medium">{errors.secretWord}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                {t.storySizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {storySizeOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setStorySize(option.code)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                      storySize === option.code
                        ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : 'border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{option.name}</div>
                    <div className="text-xs opacity-80 mt-1">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 hover:from-blue-700 hover:via-blue-600 hover:to-orange-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              <Sparkles size={24} />
              {t.createStory}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};