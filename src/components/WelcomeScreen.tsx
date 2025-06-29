import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';
import { ArrowLeft, User, Key, FileText, Wand2, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-orange-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:text-white transition-all duration-300 rounded-2xl hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour</span>
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center p-4">
                    <img 
                      src="/logo.png" 
                      alt="Hero AI Logo" 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                    <Star size={16} className="text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                    {t.appTitle}
                  </h1>
                  <p className="text-slate-300 text-lg font-medium mt-2">{t.slogan}</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hero Name Input */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    {t.heroNameLabel}
                  </label>
                  <input
                    type="text"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder={t.heroNamePlaceholder}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-lg font-medium bg-white/90 backdrop-blur-sm ${
                      errors.heroName 
                        ? 'border-red-400 bg-red-50/90' 
                        : 'border-white/30 focus:border-blue-400'
                    }`}
                  />
                  {errors.heroName && (
                    <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      {errors.heroName}
                    </p>
                  )}
                </div>

                {/* Secret Word Input */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Key size={20} className="text-white" />
                    </div>
                    {t.secretWordLabel}
                  </label>
                  <input
                    type="text"
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    placeholder={t.secretWordPlaceholder}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/30 text-lg font-medium bg-white/90 backdrop-blur-sm ${
                      errors.secretWord 
                        ? 'border-red-400 bg-red-50/90' 
                        : 'border-white/30 focus:border-orange-400'
                    }`}
                  />
                  {errors.secretWord && (
                    <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      {errors.secretWord}
                    </p>
                  )}
                </div>

                {/* Story Size Selection */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <FileText size={20} className="text-white" />
                    </div>
                    {t.storySizeLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storySizeOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => setStorySize(option.code)}
                        className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                          storySize === option.code
                            ? 'border-blue-400 bg-gradient-to-r from-blue-500/20 to-orange-500/20 text-white shadow-lg ring-4 ring-blue-500/30'
                            : 'border-white/30 hover:border-white/50 text-slate-300 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-base mb-1">{option.name}</div>
                        <div className="text-sm opacity-80">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-4 text-xl shadow-xl"
                >
                  <Wand2 size={28} />
                  {t.createStory}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};