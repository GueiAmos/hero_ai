import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption, StorySizeOption } from '../types';
import { ArrowLeft, User, Key, Wand2, Sparkles, Play } from 'lucide-react';

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
    { code: 'long', name: t.storySizes.long, description: t.storySizeDescriptions.long }
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
      {/* Header simplifié */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-6 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Retour</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
              <img 
                src="/logo.png" 
                alt="Hero AI Logo" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">Hero AI</span>
          </div>
          
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </div>
      </div>

      {/* Contenu principal centré et simplifié */}
      <div className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Crée ton histoire magique
            </h1>
            <p className="text-lg text-gray-600">
              Juste ton nom et un mot secret, et l'aventure commence ! ✨
            </p>
          </div>

          {/* Formulaire principal */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Nom du héros */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  Ton nom de héros
                </label>
                <input
                  type="text"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Comment veux-tu être appelé ?"
                  className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg font-medium bg-white ${
                    errors.heroName 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 focus:border-purple-400'
                  }`}
                />
                {errors.heroName && (
                  <p className="text-red-500 text-sm font-medium">{errors.heroName}</p>
                )}
              </div>

              {/* Mot secret */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Key size={16} className="text-white" />
                  </div>
                  Ton mot magique
                </label>
                <input
                  type="text"
                  value={secretWord}
                  onChange={(e) => setSecretWord(e.target.value)}
                  placeholder="Un mot qui t'inspire..."
                  className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 text-lg font-medium bg-white ${
                    errors.secretWord 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 focus:border-pink-400'
                  }`}
                />
                {errors.secretWord && (
                  <p className="text-red-500 text-sm font-medium">{errors.secretWord}</p>
                )}
              </div>

              {/* Taille de l'histoire - simplifié */}
              <div className="space-y-4">
                <label className="block text-lg font-bold text-gray-800">
                  Longueur de ton aventure
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {storySizeOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setStorySize(option.code)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        storySize === option.code
                          ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-bold text-base">{option.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouton de création */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-4 text-xl shadow-xl"
              >
                <Play size={24} />
                Créer mon histoire !
                <Sparkles size={24} />
              </button>

              {/* Conseil */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center">
                <p className="text-purple-700 text-sm font-medium">
                  💡 Exemple : Nom "Alex", Mot magique "robot" = une aventure technologique unique !
                </p>
              </div>
            </form>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">⚡</div>
              <div className="text-sm text-gray-600 font-medium">Instantané</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">🎨</div>
              <div className="text-sm text-gray-600 font-medium">Unique</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📖</div>
              <div className="text-sm text-gray-600 font-medium">Captivant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};