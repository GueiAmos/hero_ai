import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';
import { ArrowLeft, User, Key, FileText, Wand2, Star, Sparkles, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/40 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-pink-300/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-orange-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-300/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            <span className="font-medium text-sm">Retour</span>
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>

        {/* Main Content - Single screen layout */}
        <div className="flex-1 flex items-center justify-center px-4 lg:px-6">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left side - Hero section */}
              <div className="text-center lg:text-left space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-3">
                      <img 
                        src="/logo.png" 
                        alt="Hero AI Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                      {t.appTitle}
                    </h1>
                    <p className="text-white/80 text-sm lg:text-base font-medium">{t.slogan}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    Crée ton histoire en 3 étapes simples !
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg">
                    Donne-nous ton nom, un mot secret, et regarde la magie opérer ✨
                  </p>
                </div>

                {/* Fun stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white">∞</div>
                    <div className="text-xs text-white/80">Histoires</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white">⚡</div>
                    <div className="text-xs text-white/80">Rapide</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white">🎨</div>
                    <div className="text-xs text-white/80">Unique</div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 lg:p-8 border border-white/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1 - Hero Name */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <User size={18} className="text-emerald-600" />
                        {t.heroNameLabel}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder={t.heroNamePlaceholder}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-200 text-base font-medium bg-white ${
                        errors.heroName 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-300 focus:border-emerald-400'
                      }`}
                    />
                    {errors.heroName && (
                      <p className="text-red-500 text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {errors.heroName}
                      </p>
                    )}
                  </div>

                  {/* Step 2 - Secret Word */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Key size={18} className="text-cyan-600" />
                        {t.secretWordLabel}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={secretWord}
                      onChange={(e) => setSecretWord(e.target.value)}
                      placeholder={t.secretWordPlaceholder}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-200 text-base font-medium bg-white ${
                        errors.secretWord 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-300 focus:border-cyan-400'
                      }`}
                    />
                    {errors.secretWord && (
                      <p className="text-red-500 text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {errors.secretWord}
                      </p>
                    )}
                  </div>

                  {/* Step 3 - Story Size */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        {t.storySizeLabel}
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {storySizeOptions.map((option) => (
                        <button
                          key={option.code}
                          type="button"
                          onClick={() => setStorySize(option.code)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                            storySize === option.code
                              ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg ring-4 ring-blue-200'
                              : 'border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-sm mb-1">{option.name}</div>
                          <div className="text-xs opacity-80">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 text-lg shadow-lg"
                  >
                    <Wand2 size={24} />
                    {t.createStory}
                    <Sparkles size={20} />
                  </button>

                  {/* Fun tip */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-yellow-700 text-sm font-medium">
                      <Zap size={16} />
                      Astuce : Plus ton mot secret est original, plus ton histoire sera unique !
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};