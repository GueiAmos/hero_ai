import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';

interface WelcomeScreenProps {
  onStartGeneration: (heroName: string, secretWord: string, language: string, size: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGeneration,
  selectedLanguage,
  onLanguageChange
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16">
                <img 
                  src="/Gemini_Generated_Image_9bq1g39bq1g39bq1.png" 
                  alt="Hero AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
            </div>
            <p className="text-gray-600 leading-relaxed">{t.slogan}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✨ {t.heroNameLabel}
              </label>
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder={t.heroNamePlaceholder}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 ${
                  errors.heroName 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 focus:border-purple-400'
                }`}
              />
              {errors.heroName && (
                <p className="text-red-500 text-sm mt-1">{errors.heroName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔮 {t.secretWordLabel}
              </label>
              <input
                type="text"
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
                placeholder={t.secretWordPlaceholder}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 ${
                  errors.secretWord 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 focus:border-purple-400'
                }`}
              />
              {errors.secretWord && (
                <p className="text-red-500 text-sm mt-1">{errors.secretWord}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📏 {t.storySizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {storySizeOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setStorySize(option.code)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      storySize === option.code
                        ? 'border-purple-400 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium text-sm">{option.name}</div>
                    <div className="text-xs opacity-75 mt-1">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
            >
              ⚡ {t.createStory}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};