import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption } from '../types';
import { BookOpen, Wand2, ArrowRight, Zap, Users, Palette, Star, Rocket, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onGetStarted: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onGetStarted,
  selectedLanguage,
  onLanguageChange
}) => {
  const t = translations[selectedLanguage as Language];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-purple-200 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 border border-gray-100">
                <img 
                  src="/logo.png" 
                  alt="Hero AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">Hero AI</span>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-8">
                <Sparkles size={20} className="text-purple-600" />
                <span className="text-purple-700 font-semibold">Nouvelle génération d'IA créative</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8">
                <span className="text-gray-800">Crée ton</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Univers Magique
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                {t.landingDescription || "Transforme ton nom et un mot secret en une aventure extraordinaire générée par l'IA. Des histoires uniques, des illustrations magnifiques, le tout en quelques secondes."}
              </p>

              {/* CTA Button */}
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-4 text-xl shadow-xl mx-auto mb-16"
              >
                <Wand2 size={28} />
                {t.startCreating || "Commencer à créer"}
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Rocket size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">IA Avancée</h3>
                <p className="text-gray-600 leading-relaxed">Histoires uniques avec personnages d'âges et professions variés, générées par l'intelligence artificielle la plus avancée.</p>
              </div>
              
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-200">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Palette size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Art Personnalisé</h3>
                <p className="text-gray-600 leading-relaxed">Illustrations uniques générées spécialement pour chaque histoire, dans un style moderne et captivant.</p>
              </div>
              
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Universel</h3>
                <p className="text-gray-600 leading-relaxed">Adapté à tous les âges et toutes les cultures, avec des histoires qui inspirent et divertissent.</p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=500&fit=crop"
                  alt="Enfant lisant un livre magique avec des étoiles qui s'échappent"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Sparkles size={32} className="text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Star size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-12 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">∞</div>
                <div className="text-gray-600 font-medium">Histoires possibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">AI</div>
                <div className="text-gray-600 font-medium">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">⚡</div>
                <div className="text-gray-600 font-medium">Instantané</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 bg-gray-50 border-t border-gray-100">
          <p className="flex items-center justify-center gap-2 text-gray-500">
            Créé avec ❤️ par Hero AI
          </p>
        </footer>
      </div>
    </div>
  );
};