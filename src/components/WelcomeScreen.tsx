import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';
import { ArrowLeft, User, Key, FileText, Wand2, Star, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
              <img 
                src="/logo.png" 
                alt="Hero AI Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">Hero AI</span>
          </div>
          
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
                  <Star size={16} className="text-purple-600" />
                  <span className="text-purple-700 font-medium text-sm">Créateur d'histoires IA</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Crée ton histoire en 3 étapes
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Donne-nous ton nom, un mot secret, et regarde la magie opérer ✨
                </p>
              </div>

              {/* Steps Preview */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Ton nom de héros</h3>
                    <p className="text-gray-600">Dis-nous comment tu veux être appelé dans ton aventure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Mot secret magique</h3>
                    <p className="text-gray-600">Un mot qui va déclencher toute ton aventure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Taille de l'histoire</h3>
                    <p className="text-gray-600">Choisis la longueur de ton aventure</p>
                  </div>
                </div>
              </div>

              {/* Fun Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">∞</div>
                  <div className="text-sm text-gray-600">Histoires</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">⚡</div>
                  <div className="text-sm text-gray-600">Rapide</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🎨</div>
                  <div className="text-sm text-gray-600">Unique</div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Hero Name */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    {t.heroNameLabel}
                  </label>
                  <input
                    type="text"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder={t.heroNamePlaceholder}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg font-medium bg-white ${
                      errors.heroName 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-300 focus:border-purple-400'
                    }`}
                  />
                  {errors.heroName && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.heroName}
                    </p>
                  )}
                </div>

                {/* Secret Word */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Key size={16} className="text-white" />
                    </div>
                    {t.secretWordLabel}
                  </label>
                  <input
                    type="text"
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    placeholder={t.secretWordPlaceholder}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 text-lg font-medium bg-white ${
                      errors.secretWord 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-300 focus:border-pink-400'
                    }`}
                  />
                  {errors.secretWord && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.secretWord}
                    </p>
                  )}
                </div>

                {/* Story Size */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-white" />
                    </div>
                    {t.storySizeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {storySizeOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => setStorySize(option.code)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                          storySize === option.code
                            ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg ring-4 ring-blue-200'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-50'
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
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-4 text-xl shadow-xl"
                >
                  <Wand2 size={28} />
                  {t.createStory}
                  <Sparkles size={24} />
                </button>

                {/* Tip */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center">
                  <p className="text-purple-700 text-sm font-medium">
                    💡 Plus ton mot secret est original, plus ton histoire sera unique !
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};